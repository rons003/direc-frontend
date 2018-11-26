import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';
import { Employee } from '../../model/employee.model';
import swal from 'sweetalert2'

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

  createNew() {
    this.employee = new Employee();
    this.showModal();
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

  viewEmployee(id: any) {
    this.employeeService.getEmployee(id)
      .subscribe(
        (employee: Employee) => {
          this.employee = employee;
          this.showModal();
        }
      );
  }

  showModal() {
    $('#employee-modal').modal('show');
  }

  hideModal() {
    $('#employee-modal').modal('hide');
  }

  onSubmit() {
    if (this.employee.id) {
      this.employeeService.updateEmployee(this.employee)
        .subscribe(
          (res: any) => {
            if (res.result === 'success') {
              this.getAllEmployee();
              swal(
                'Success!',
                'Employee Information successfully updated!',
                'success'
              );
              this.hideModal();
            }
          }
        );
    } else {
      this.employeeService.createEmployee(this.employee)
        .subscribe(
          (res: any) => {
            if (res.result === 'success') {
              this.getAllEmployee();
              swal(
                'Success!',
                'New Employee has been Added!',
                'success'
              );
              this.hideModal();
            }
          }
        );
    }
  }

  deleteEmployee(id: any) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.employeeService.deleteEmployee(id)
          .subscribe(
            (res: any) => {
              if (res.result === 'success') {
                swal(
                  'Deleted!',
                  'Employee Information has been deleted.',
                  'success'
                );
                this.getAllEmployee();
              }
            }
          );
      }
    });
  }
}
