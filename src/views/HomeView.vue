<template>
  <div class="home">
    <div class="sidebar">
      <h3 class="title">Ordonnancement des tâches</h3>
      <Divider />

      <template v-if="selectedTable">
        <div class="table_description">
          <p>Nom du tableau : {{ selectedTable.name }}</p>
          <p>Nombre de tâches : {{ selectedTable.getTasks.size }}</p>
          <p>Durée totale: {{ selectedTable.totalDuration }}</p>

          <div style="display: flex; justify-content: end; gap: 5px;">
            <Button icon="pi pi-file-plus" severity="secondary" raised label="Ajouter tâche" @click="openTaskCreationDialog"/>
            <Button icon="pi pi-trash" severity="danger" raised label="Supprimer" @click="deleteTable"
              v-if="!['Test 1', 'Test 2', 'Test 3'].includes(selectedTable.name)"
            />
          </div>
        </div>
        
        <Divider />

        <h3>Liste des tâches</h3>
        <Card v-for="[key, task] in selectedTable.getTasks" style="margin-bottom: 5px;">
          <template #content>
            <div style="display: flex; justify-content: end; gap: 4px;">
              <Button icon="pi pi-pen-to-square" variant="text" severity="info" raised rounded aria-label="Edit" size="small" 
               @click="openTaskUpdatingDialog(key, task)" />
              <Button icon="pi pi-trash" variant="text" severity="danger" raised rounded aria-label="Delete" size="small" 
               @click="confirmDelete(key, task)"
              />
            </div>
            <p style="margin-top: 0;">Nom: {{ key }}</p>
            <p>Durée : {{ task.duration }}</p>
            <p>Marge de retard : {{ task.lateDate - task.earlyDate }}</p>
            <p style="margin-bottom: 2px;">Tâche(s) antérieure(s) :</p>
            <div style="display: flex; flex-wrap: wrap; gap: 5px;">
              <Chip v-for="previousTask in task.previousTasks" :label="previousTask"/>
            </div>
          </template>
        </Card>
      </template>
    </div>

    <div class="wrapper">
      <div class="topnav">
        <div style="grid-column: 1/4; display: flex; justify-content: center;">
          <Select v-model="selectedTable" :options="TableList" optionLabel="name" placeholder="Selectionner le tableau" class="w-full md:w-56" />
        </div>
        <div style="display: flex; justify-content: end;">
          <Button label="Créer tableau" icon="pi pi-file-plus" @click="openTableCreationDialog"/>
        </div>
      </div>
  
      <Card>
        <template #content>
          <template v-if="selectedTable">
            <TableView :table="selectedTable"/>
        
            <Divider/>
            <EarlyDateView :table="selectedTable"/>
      
            <Divider/>
            
            <LateDateView :table="selectedTable"/>
  
            <Divider/>
            <CriticalPathView :nodes="selectedTable.getNodes" :edges="selectedTable.getEdges"/>
            
          </template>
        </template>
      </Card>
    </div>

  <Dialog v-model:visible="isCreationDialogVisible" modal close-on-escape header="Création d'un nouveau tableau" :style="{ width: '40rem'}">
    <form @submit.prevent="submitTableCreation">
      <div style="width: 60%;">
        <p style="flex-grow: 1; text-wrap: nowrap; margin: 0;">Nom du tableau: </p>
        <InputText style="flex-grow: 1;" v-model="initialNewTableValues.name" name="name" type="text" fluid 
        :invalid="nameErrorMessage.length > 0"
        />
        <Message severity="error" variant="simple" size="small">{{ nameErrorMessage }}</Message>
      </div>

      <div v-if="initialNewTableValues.tasks.length>0">
        <p style="margin-bottom: 0;">{{ 
          (initialNewTableValues.tasks.length > 1)? "Tâches" : "Tâche"
          }}</p>
        <div v-for="(task, index) in initialNewTableValues.tasks" style="display: flex; gap: 5px; align-items:first baseline;">
          <i class="pi pi-angle-right"></i>
          <div>
            <InputText style="flex-grow: 1;" v-model="task.name" name="task" type="text" placeholder="Nom" fluid
             :invalid="tasksErrorMessage[index].name.length > 0"/>
            <Message severity="error" variant="simple" size="small">{{ tasksErrorMessage[index].name }}</Message>
          </div>
          <div>
            <InputNumber v-model="task.duration" name="duration" placeholder="Durée" fluid :invalid="tasksErrorMessage[index].duration.length > 0"/>
            <Message severity="error" variant="simple" size="small">{{ tasksErrorMessage[index].duration }}</Message>
          </div>
          <Button icon="pi pi-trash" variant="text" severity="danger" raised rounded aria-label="Delete" size="small" 
            @click="removeTask(index)"  
          />
        </div>
      </div>

      <Message severity="error" variant="simple" size="small" style="margin-top: 10px;">{{ taskError }}</Message>
      <Divider />
      <div style="display: flex; justify-content: space-between;">
        <Button icon="pi pi-file-plus" raised label="Ajouter tâche" @click="addEmptyTask"/>

        <div style="display: flex; gap: 2px;">
          <Button type="submit" icon="pi pi-check" severity="info" raised label="Confirmer"/>
          <Button icon="pi pi-times" severity="danger" @click="isCreationDialogVisible = false" raised label="Annuler"/>
        </div>
      </div>
    </form>
  </Dialog>

  <Dialog v-model:visible="isAddingTaskDialogVisible" modal close-on-escape header="Ajout d'une nouvelle tâche" :style="{ width: '30rem' }">
    <form @submit.prevent="submitTaskCreation">
      <div>
        <p style="margin-bottom: 0;">Nom</p>
        <InputText v-model="newTask.name" name="task" type="text" fluid/>
      </div>

      <div>
        <p style="margin-bottom: 0;">Durée</p>
        <InputNumber v-model="newTask.duration" name="duration" fluid/>
      </div>

      <Divider />

      <div style="display: flex; gap: 5px; justify-content: center;">
        <Button type="submit" icon="pi pi-check" severity="info" raised label="Confirmer"/>
        <Button icon="pi pi-times" severity="danger" @click="isAddingTaskDialogVisible = false" raised label="Annuler"/>
      </div>
    </form>
  </Dialog>

  <Dialog v-model:visible="isUpdatingTaskDialogVisible" modal close-on-escape :header='`Mise à jour de la tâche "${selectedTaskKey}"`' :style="{ width: '30rem' }">
    <form @submit.prevent="submitTaskUpdate">
      <div>
        <p style="margin-bottom: 0;">Durée</p>
        <InputNumber v-model="selectedTask.duration" name="duration" fluid/>
      </div>

      <div>
        <p style="margin-bottom: 0;">Tâches antérieures</p>
        <MultiSelect v-model="selectedTask.previousTasks" :options="selectedTable?.getTaskArray(selectedTaskKey)" display="chip" filter placeholder="Selectionner" style="width: 80%;" />
      </div>

      <Divider />

      <div style="display: flex; gap: 5px; justify-content: center;">
        <Button type="submit" icon="pi pi-check" severity="info" raised label="Confirmer"/>
        <Button icon="pi pi-times" severity="danger" @click="isUpdatingTaskDialogVisible = false" raised label="Annuler"/>
      </div>
    </form>
  </Dialog>

  <ConfirmDialog></ConfirmDialog>
  <Toast position="bottom-right"></Toast>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Chip from 'primevue/chip';
import Message from 'primevue/message';
import Button from 'primevue/button';
import Select from 'primevue/select';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import MultiSelect from 'primevue/multiselect';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast';
import { Dialog } from 'primevue';
import Divider from 'primevue/divider';
import Card from 'primevue/card';
import { TableModel, type TaskModel } from '@/models/TableModel';
import LateDateView from '@/components/LateDateView.vue';
import EarlyDateView from '@/components/EarlyDateView.vue';
import TableView from '@/components/TableView.vue';
import CriticalPathView from '@/components/CriticalPathView.vue';
import { DefaultTable1, DefaultTable2, DefaultTable3 } from '@/const/DefaultTables';


const toast = useToast()

const isCreationDialogVisible = ref<boolean>(false)
const TableList = ref<TableModel[]>([])
const selectedTable = ref<TableModel>()
onMounted(()=>{
  TableList.value = [
    DefaultTable1,
    DefaultTable2,
    DefaultTable3
  ]

  selectedTable.value = TableList.value[0]
})

const deleteTable = ()=>{
  TableList.value = TableList.value.filter((table)=>{
    return table.name != selectedTable.value?.name
  })
  selectedTable.value = TableList.value[0]
}


///////////////////////////////////////////
///////////////////////////////////////////
/////////    Task creation      //////////
///////////////////////////////////////////
///////////////////////////////////////////
const newTask = ref<TaskModel>({
  name: '',
  duration: 0,
  earlyDate: 0,
  lateDate: 0,
  previousTasks: [],
  nextTasks: []
})
const isAddingTaskDialogVisible = ref<boolean>(false)
const openTaskCreationDialog = ()=>{
  isAddingTaskDialogVisible.value = true
  newTask.value = {
    name: '',
    duration: 0,
    earlyDate: 0,
    lateDate: 0,
    previousTasks: [],
    nextTasks: []
  }
}

const submitTaskCreation = ()=>{
  selectedTable.value?.addTask(newTask.value)
  isAddingTaskDialogVisible.value = false
}


///////////////////////////////////////////
///////////////////////////////////////////
/////////      Task update       //////////
///////////////////////////////////////////
///////////////////////////////////////////
const selectedTaskKey = ref<string>('')
const selectedTask = ref<TaskModel>({
  duration: 0,
  earlyDate: 0,
  lateDate: 0,
  previousTasks: [],
  nextTasks: []
})
const isUpdatingTaskDialogVisible = ref<boolean>(false)
const openTaskUpdatingDialog = (key: string, task: TaskModel)=>{
  isUpdatingTaskDialogVisible.value = true
  selectedTaskKey.value = key
  selectedTask.value = task
}

const submitTaskUpdate = ()=>{
  selectedTable.value?.updateTask(selectedTaskKey.value, selectedTask.value)
  isUpdatingTaskDialogVisible.value = false
}

///////////////////////////////////////////
///////////////////////////////////////////
/////////      Task delete      //////////
///////////////////////////////////////////
///////////////////////////////////////////

const confirm = useConfirm()

const confirmDelete = (taskKey: string, task: TaskModel)=>{
  selectedTaskKey.value = taskKey
  selectedTask.value = task

  confirm.require({
    message: `Voulez vous vraiment supprimer la tâche "${selectedTaskKey.value}"?`,
        header: 'Suppression',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Annuler',
        rejectProps: {
            label: 'Annuler',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Supprimer',
            severity: 'danger'
        },
        accept: () => {
          let result = selectedTable.value?.deleteTask(selectedTaskKey.value)
          if(result) toast.add({ severity: 'info', summary: 'Succées', detail: 'Suppression effectuée', life: 3000 });
          else toast.add({ severity: 'error', summary: 'Echec', detail: 'Suppession échouée', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'warn', summary: 'Rejeté', detail: 'Vous avez rejeté la supppression', life: 3000 });
        }
  })
}

///////////////////////////////////////////
///////////////////////////////////////////
/////////    Table creation      //////////
///////////////////////////////////////////
///////////////////////////////////////////
const initialNewTableValues = reactive<{
  name: string,
  tasks: TaskModel[]
}>({
  name: '',
  tasks: []
})
const openTableCreationDialog = ()=>{
  isCreationDialogVisible.value = true
  initTableCreation()
}

const nameErrorMessage = ref('')
const taskError = ref('')
const tasksErrorMessage = ref<{
  name:string,
  duration: string
}[]>([])
const initTableCreation = ()=>{
  nameErrorMessage.value = ''
  taskError.value = ''
  tasksErrorMessage.value = []
  initialNewTableValues.name = ''
  initialNewTableValues.tasks = []
}

const addEmptyTask = ()=>{
  initialNewTableValues.tasks.push({
    name: '',
    duration: 0,
    lateDate: 0,
    earlyDate: 0,
    previousTasks: [],
    nextTasks: []
  })
  taskError.value = ''
  tasksErrorMessage.value.push({
    name: '',
    duration: ''
  })
}

const removeTask = (index: number)=>{
  initialNewTableValues.tasks.splice(index, 1)
  tasksErrorMessage.value.splice(index, 1)
}


const validateName = ()=>{
  if(initialNewTableValues.name.length > 0){
    nameErrorMessage.value = ''
  }else{
    nameErrorMessage.value = 'Veuillez remplir le nom du tableau'
  }
  
  return (initialNewTableValues.name.length > 0);
}

const validateTasks = ()=>{
  let valid = true;

  if(initialNewTableValues.tasks.length > 0){
    taskError.value = ''

    for(let i=0; i < initialNewTableValues.tasks.length; i++){
      if(initialNewTableValues.tasks[i].name!.length > 0){
        tasksErrorMessage.value[i].name = ''
      }else{
        tasksErrorMessage.value[i].name = 'Champ requis'
        valid = false
      }

      if(initialNewTableValues.tasks[i].duration == undefined){
        tasksErrorMessage.value[i].duration = 'Champ requis'
        valid = false
      }else{
        tasksErrorMessage.value[i].duration = ''
      }
    }
  }else{
    taskError.value = 'Veuillez ajouter au moins une tâche'
    valid = false
  }

  return valid;
}

const submitTableCreation = ()=>{
  if(validateName() && validateTasks()){
    isCreationDialogVisible.value = false
    let taskMap = new Map<string, TaskModel>()
    initialNewTableValues.tasks.forEach((task)=>{
      if(task.name) taskMap.set(task.name, {
        duration: task.duration,
        lateDate: task.lateDate,
        earlyDate: task.earlyDate,
        previousTasks: task.previousTasks,
        nextTasks: task.nextTasks
      })
    })

    TableList.value.push(new TableModel(initialNewTableValues.name, taskMap))
  }
}
</script>

<style scoped lang="scss">
.home{
  display: flex;
  height: 100vh;
  overflow: hidden;

  .sidebar{
    width: 24%;
    padding: 0 15px 15px 15px;
    overflow-y: scroll;

    .title{
      font-size: 1.2rem;
      text-align: center;
      position: sticky;
      top: 0;
      z-index: 3;
      padding: 20px;
      margin: 0;
      background-color: #f8fafc;
    }
  }

  .wrapper{
    width: 76%;
    overflow-y: scroll;

    .topnav{
      display: grid; 
      grid-template-columns: repeat(4, 1fr); 
      padding: 8px;
      position: sticky;
      top: 0;
      background-color: white;
    }
  }
}
</style>


