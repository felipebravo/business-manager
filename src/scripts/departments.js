import { Render } from "./render.js";
import { Requests } from "./requests.js"

class Departments {

  static handleDarkMode() {
    const btnMode = document.querySelector('.dark-mode-button')
    const html = document.querySelector('html')

    btnMode.addEventListener('click', () => {
      html.classList.toggle('dark-mode')
      Departments.modeListener()
    })
  }

  static modeListener() {
    const btnMode = document.querySelector('.dark-mode-button')
    const html = document.querySelector('html')

    if(html.classList.contains("dark-mode")) {
      btnMode.innerText = 'Light Mode'
    } else {
      btnMode.innerText = 'Dark Mode'
    }
  }

  static async createNewDepartment() {
    const section = document.querySelector('.create__department')
    const btnCreateNewDepartment = document.querySelector('.create__department form button')
    const newDepart = document.getElementById('departmentname')
    const newDepartDescription = document.getElementById('departmentdescription')
    const selectOption = document.getElementById('companiesOptions')

    const allCompanies = await Requests.showAllCompanies()
    
    allCompanies.forEach(companie => {
      const cardOption = Render.renderCompaniesOptions(companie)

      selectOption.appendChild(cardOption)
    })

    btnCreateNewDepartment.addEventListener('click', async (evt) => {
      evt.preventDefault()

      const data = {
        name: newDepart.value,
        description: newDepartDescription.value,
        company_uuid: selectOption.selectedOptions[0].id
      }

      const res = await Requests.createDepartment(data)
    })
  }

  static async handleDepartmentsByCOmpanie() {
    const div = document.querySelector('.departments__companie')
    const btnSearchDepartByCompanie = document.querySelector('.departments__by__companie form button')
    
    const selectOption = document.getElementById('selectCompanie')

    const allCompanies = await Requests.showAllCompanies()
    
    allCompanies.forEach(companie => {
      const cardOption = Render.renderCompaniesOptions(companie)

      selectOption.appendChild(cardOption)
    })

    const selectDepart = document.getElementById('selectDepartment')

    const allDepartments = await Requests.allDepartments()

    allDepartments.forEach(department => {
      const cardOption = Render.renderDepartmentsOptions(department)
      
      selectDepart.appendChild(cardOption)
    })

    btnSearchDepartByCompanie.addEventListener('click', async (evt) => {
      evt.preventDefault()
      
      const res = await Requests.allDepartmentsByCompanie(selectOption.selectedOptions[0].id)
      
      if(selectDepart.selectedOptions[0].id == 0) {
        div.innerText = ''

        res.forEach(department => {
          const departmentCard = Render.renderDepartmentCard(department)

          div.appendChild(departmentCard)
        })
      } else {
        div.innerText = ''

        res.forEach(department => {
          if(department.name == selectDepart.selectedOptions[0].innerText) {
            const departmentCard = Render.renderDepartmentCard(department)

            div.appendChild(departmentCard)
          }
        })
      }
      
      
    })
  }

  static async handleDepartmentDescription() {
    const div = document.querySelector('.department__render')
    const btnSearchDepart = document.querySelector('.department__description form button')
    
    const selectOption = document.getElementById('departmentoptions')

    const allDepartments = await Requests.allDepartments()

    allDepartments.forEach(department => {
      const cardOption = Render.renderDepartmentsOptions(department)
      
      selectOption.appendChild(cardOption)
    })

    btnSearchDepart.addEventListener('click', (evt) => {
      evt.preventDefault()
      
      allDepartments.forEach(department => {
        if(selectOption.selectedOptions[0].innerText == department.name) {
          const cardDepartment = Render.renderDepartmentCard(department)

          div.innerText = ''

          div.appendChild(cardDepartment)
        }        
      })  
    })
  }

  static async handleWorkersByDepartment() {
    const sectionForm = document.querySelector('.workers__by__department form')
    const btnSearch = document.querySelector('.workers__by__department form button')
    const ulWorkers = document.createElement('ul')
    
    const selectDepart = document.getElementById('departoptions')

    const allDepartments = await Requests.allDepartments()

    allDepartments.forEach(department => {
      const cardOption = Render.renderDepartmentsOptions(department)
      
      selectDepart.appendChild(cardOption)
    })

    btnSearch.addEventListener('click', async (evt) => {
      evt.preventDefault()

      const allWorkers = await Requests.allWorkers()
      
      ulWorkers.innerText = ''
      
      allWorkers.forEach(worker => {
        if(worker.department_uuid == selectDepart.selectedOptions[0].id) {
          const workerCard = Render.renderUsers(worker)

          ulWorkers.appendChild(workerCard)
        }
      })
      
      sectionForm.appendChild(ulWorkers)
    })
  }

  static async hireFireWorker() {
    const btnHire = document.querySelector('.hire')
    const btnFire = document.querySelector('.fire')

    const selectWorker = document.getElementById('workername')
    const selectDepart = document.getElementById('departhiring')

    const allWorkers = await Requests.allWorkers()
    
    function workersOptions(worker) {
      const cardWorker = Render.renderWorkersOptions(worker)

      selectWorker.appendChild(cardWorker)
    }
    allWorkers.forEach(workersOptions)

    const allDepartments = await Requests.allDepartments()

    function departsOptions(department) {
      const cardOption = Render.renderDepartmentsOptions(department)
      
      selectDepart.appendChild(cardOption)
    }
    allDepartments.forEach(departsOptions)

    btnHire.addEventListener('click', async (evt) => {
      evt.preventDefault()

      const data = {
      user_uuid: selectWorker.selectedOptions[0].id,
      department_uuid: selectDepart.selectedOptions[0].id
      }
      
      const res = await Requests.hireWorker(data)
    })

    btnFire.addEventListener('click', async (evt) => {
      evt.preventDefault()
  
      const res = await Requests.fireWorker(selectWorker.selectedOptions[0].id)
    })
  }

  static async editWorker() {
    const btnEdit = document.querySelector('.edit__worker button')

    const allWorkers = await Requests.allWorkers()

    const selectWorker = document.getElementById('employeename')
    const selectType = document.getElementById('worktype')
    const selectLevel = document.getElementById('level')
    
    function workersOptions(worker) {
      const cardWorker = Render.renderWorkersOptions(worker)

      selectWorker.appendChild(cardWorker)
    }
    allWorkers.forEach(workersOptions)

    btnEdit.addEventListener('click', async (evt) => {
      evt.preventDefault()

      const data = {
        kind_of_work: selectType.selectedOptions[0].innerText.toLowerCase(),
        professional_level: selectLevel.selectedOptions[0].id
      }
      console.log(data)
      console.log(selectWorker.selectedOptions[0].id)
      const res = await Requests.editWorker(data, selectWorker.selectedOptions[0].id)

      console.log(res)
    })
  }

  static async handleUsersOutOfWork() {
    const section = document.querySelector('.available__employees')

    const ulUsersOutOfWork = document.createElement('ul')

    const allUsersOutOfWork = await Requests.usersOutOfWork()

    allUsersOutOfWork.forEach(user => {
      const userCard = Render.renderUsers(user)

      ulUsersOutOfWork.appendChild(userCard)
    })

    section.appendChild(ulUsersOutOfWork)
  }

  static handleBegin() {
    const btnsHeaders = document.querySelectorAll('header ul li')
    let btnSectors = ''

    btnsHeaders.forEach(btn => {
      btn.innerText == 'Inicio' ? btnSectors = btn : null
    })

    btnSectors.addEventListener('click', (evt) => {
      window.location.href='./dashboard.html'
    })
  }

  static handleSectors() {
    const btnsHeaders = document.querySelectorAll('header ul li')
    let btnSectors = ''

    btnsHeaders.forEach(btn => {
      btn.innerText == 'Setores' ? btnSectors = btn : null
    })

    btnSectors.addEventListener('click', (evt) => {
      window.location.href='./sectors.html'
    })
  }

  static handleCompanies() {
    const btnsHeaders = document.querySelectorAll('header ul li')
    let btnSectors = ''

    btnsHeaders.forEach(btn => {
      btn.innerText == 'Empresas' ? btnSectors = btn : null
    })

    btnSectors.addEventListener('click', (evt) => {
      window.location.href='./companies.html'
    })
  }

  static logout() {
    const btnLogout = document.querySelector('.logout')
    
    btnLogout.addEventListener('click', (evt) => {
      evt.preventDefault()

      localStorage.removeItem('@kenzieCompanies:user_uuid')
      localStorage.removeItem('@kenzieCompanies:token')
      window.location.href='../../homepage.html'
    })
  }
}

Departments.handleDarkMode()
Departments.modeListener()
Departments.createNewDepartment()
Departments.handleDepartmentsByCOmpanie()
Departments.handleDepartmentDescription()
Departments.handleWorkersByDepartment()
Departments.hireFireWorker()
Departments.editWorker()
Departments.handleUsersOutOfWork()
Departments.handleBegin()
Departments.handleSectors()
Departments.handleCompanies()
Departments.logout()