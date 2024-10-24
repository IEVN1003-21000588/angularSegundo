import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export default class EmpleadosComponent {
  matricula: string = '';
  nombre: string = '';
  correo: string = '';
  edad: number | null = null;
  horasTrabajadas: number | null = null;
  empleados: any[] = [];

  agregarEmpleado() {
    if (this.matricula && this.nombre && this.correo && this.edad && this.horasTrabajadas !== null) {
      const { subtotal, extras, total } = this.calcularPago(this.horasTrabajadas);
      const empleado = {
        matricula: this.matricula,
        nombre: this.nombre,
        correo: this.correo,
        edad: this.edad,
        horasTrabajadas: this.horasTrabajadas,
        subtotal,
        extras,
        total
      };
      this.empleados.push(empleado);
      this.guardarEnLocalStorage();
      this.resetForm();
    }
  }

  modificarEmpleado() {
    // Encontrar el índice del empleado por matrícula
    const index = this.empleados.findIndex(emp => emp.matricula === this.matricula);
    
    // Si se encuentra el empleado, actualizamos sus datos
    if (index !== -1) {
      const { subtotal, extras, total } = this.calcularPago(this.horasTrabajadas!);
      this.empleados[index] = {
        matricula: this.matricula,
        nombre: this.nombre,
        correo: this.correo,
        edad: this.edad,
        horasTrabajadas: this.horasTrabajadas,
        subtotal,
        extras,
        total
      };
      this.guardarEnLocalStorage();
      this.resetForm();
    } else {
      alert("Empleado no encontrado");
    }
  }

  eliminarEmpleado() {
    this.empleados = this.empleados.filter(emp => emp.matricula !== this.matricula);
    this.guardarEnLocalStorage();
  }

  // Función para calcular el subtotal, pago por horas extras y total
  calcularPago(horas: number) {
    const tarifaNormal = 70;
    const tarifaExtra = 140;
    let horasNormales = horas > 40 ? 40 : horas;
    let horasExtras = horas > 40 ? horas - 40 : 0;
    let subtotal = horasNormales * tarifaNormal;
    let extras = horasExtras * tarifaExtra;
    let total = subtotal + extras;

    return { subtotal, extras, total };
  }

  // Función para calcular el total acumulado a pagar a todos los empleados
  calcularTotalPagos(): number {
    return this.empleados.reduce((acc, empleado) => acc + empleado.total, 0);
  }

  guardarEnLocalStorage() {
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }

  cargarDesdeLocalStorage() {
    const data = localStorage.getItem('empleados');
    if (data) {
      this.empleados = JSON.parse(data);
    }
  }

  ngOnInit() {
    this.cargarDesdeLocalStorage();
  }

  resetForm() {
    this.matricula = '';
    this.nombre = '';
    this.correo = '';
    this.edad = null;
    this.horasTrabajadas = null;
  }
}
