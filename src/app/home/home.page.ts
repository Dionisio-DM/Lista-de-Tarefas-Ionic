import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tasks: {description: string, timer: string, initialTimer: string}[] = []

  constructor(private alertController: AlertController) {}

  async addTask(){
    const alert = await this.alertController.create({
      header: 'Nova tarefa',
      inputs: [
      {
        name: 'description',
        type: 'text',
        placeholder: 'Adicionar nova tarefa'
      },
      {
        name: 'timer',
        type: 'text',
        placeholder: 'Adiconar tempo. Ex.: 00:00:00'
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Adicionar',
        handler: (data)=>{
          this.tasks.push({description: data.description, timer: data.timer, initialTimer: data.timer})
        }
      }
    ]
    })
    await alert.present()
  }

  countDown(task: {description: string, timer: string, initialTimer: string}){
    const interval = setInterval(()=>{
      const parts = task.timer.split(':')
      const hours = parseFloat(parts[0])
      const min = parseFloat(parts[1])
      const sec = parseFloat(parts[2])
      let totalSec = hours * 60 * 60 + min * 60 + sec

      if(totalSec > 0){
        totalSec--
        const newHour = Math.floor(totalSec / 60)
        const newMin = Math.floor(totalSec / 60) - 60 * newHour
        const newSec = totalSec % 60

        task.timer = `${newHour.toString().padStart(2, '0')}:
        ${newMin.toString().padStart(2, '0')}:
        ${newSec.toString().padStart(2,'0')}`
      } else {
        clearInterval(interval)
        task.timer = task.initialTimer
      }
    }, 1000)
  }

}
