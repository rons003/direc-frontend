import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';
import { Employee } from '../../model/employee.model';

declare var $: any; // jQuery

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  private employees: Employee[];
  private employee: Employee;
  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {
    this.employee = new Employee();
  }

  ngOnInit() {
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.employeeService.getAllEmployee()
      .subscribe(
        (employees: Employee[]) => {
          if (employees != null) {
            this.employees = employees;
          }
        }
      );
  }

  showModal() {
    $('#employee-modal').modal('show');
  }

  hideModal() {
    $('#employee-modal').modal('hide');
  }

  onSubmit(employee: Employee) {
    this.employeeService.createEmployee(employee)
      .subscribe(
        (res: any) => {
          if (res.result === 'success') {
            console.log(res.message);
            this.getAllEmployee();
            this.hideModal();
          }
        }
      );
  }

  deleteEmployee(id: any) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        (res: any) => {
          if (res.result === 'success') {
            this.getAllEmployee();
          }
        }
      );
  }

}
