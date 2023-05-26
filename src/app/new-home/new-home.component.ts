import { Component, OnInit, computed, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataListService } from '../data-list.service';
import { Post } from '../post';

export interface Employee {
  id: number;
  name: string;
  position: string;
  departmaent: string;
};
@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.scss']
})

export class NewHomeComponent implements OnInit {
  firstName = signal('Marc');
  LasttName = signal('Deo');
  fullName = computed(() => this.firstName() + ' ' + this.LasttName())
  count = signal<number>(0)
  employeeFrom!: FormGroup
  initialEmployeesList = [
    { id: 1, name: 'John Smith', position: 'Manager', departmaent: 'Sales' },
    { id: 2, name: 'Jane Doe', position: 'Engineering', departmaent: 'Engineer' },
    { id: 3, name: 'Bob Johnson', position: 'Marketing Manager', departmaent: 'Marketing' },
    { id: 4, name: 'Sarah Lee', position: 'HR Manager', departmaent: 'Human Resources' },
    { id: 5, name: 'Michael Brown', position: 'It Support', departmaent: 'IT' }
  ]
  employees = signal<Employee[]>(this.initialEmployeesList)
  showForm = false;
  isEdit = false;
  currentItemId: number = 3;
  currentId = computed(() => this.currentItemId + 1);
  positingLists: any = [];
  departmaentLists: any = [];
  posts = new Array();
  DataListInitialList: any = []
  DataList = signal(this.DataListInitialList)


  readonly firstPage = 1;
  itemsPerPage = 10;

  searchInput = signal('');
  currentPage = signal(this.firstPage);

  constructor(private fb: FormBuilder, private dataList: DataListService) { }

  

  ngOnInit(): void {
    
    this.dataList.getPosts().subscribe(response => {
     this.posts = response
    })
    this.paginatedAndFilteredUsers
    this.employees().sort((a, b) => a.name > b.name ? 1 : -1)
    this.positingLists = Object.values(this.employees().map((empl) => empl.position))
    this.departmaentLists = Object.values(this.employees().map((emplDep) => emplDep.departmaent))
    this.employeeFrom = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      position: ['', Validators.required],
      departmaent: ['', Validators.required]
    })
  }

  paginatedAndFilteredUsers = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage;
    console.log(startIndex)
    const endIndex = startIndex + this.itemsPerPage;
    return this.posts.filter((post) =>
      post.firstName.toLowerCase().includes(this.searchInput().toLowerCase())
      )
      .slice(startIndex, endIndex);
  });

  searchUser(searchText: string): void {
    this.searchInput.set(searchText);
    if (this.currentPage() > this.firstPage) {
      this.currentPage.set(this.firstPage);
    }
  }

  goToPrevPage(): void {
    this.currentPage.update((currentPage) => Math.max(currentPage - 1, 1));
  }

  goToNextPage(): void {
    this.currentPage.update((currentPage) =>
      Math.min(currentPage + 1, this.itemsPerPage + 1)
    );
  }

  updatefirstName(fNme: string) {
    this.firstName.set(fNme)
  }

  updateLasttName(lLame: string) {
    this.LasttName.set(lLame)
  }

  decreaseCount() {
    this.count.update((v) => v - 1)
  }

  increaseCount() {
    this.count.update((v) => v + 1)
  }

  addItem() {
    this.showForm = true
    let id = this.currentId()
    if (this.employeeFrom.valid) {
      this.employees.update((empList: Employee[]) => {
        const emp: Employee = { id: id, ...this.employeeFrom.value };
        return [...empList, emp];
      })
      this.employeeFrom.reset(0)
    }
  }

  updateItem() {
    let item = this.employeeFrom.value
    let updatedItem = this.employees().map((employeeItem) => {
      if (item.id === employeeItem.id) {
        return { ...item }
      }
      return employeeItem;
    })
    this.employees.set(updatedItem)
    this.showForm = false
    this.isEdit = false
  }

  editItem(item: any) {
    this.showForm = true
    this.isEdit = true
    this.employeeFrom.setValue({
      id: item.id,
      name: item.name,
      position: item.position,
      departmaent: item.departmaent
    })
  }

  removeItem(id: any) {
    this.employees.update((emp) => emp.filter((item) => item.id !== id))
  }

  cancelImp() {
    this.showForm = false
    this.isEdit = false
  }
}
