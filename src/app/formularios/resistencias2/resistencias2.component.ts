import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-resistencias2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './resistencias2.component.html',
  styleUrls: ['./resistencias2.component.css']
})
export default class Resistencias2Component {
  formulario!: FormGroup;

  colores: string[] = ['Negro', 'Marrón', 'Rojo', 'Naranja', 'Amarillo', 'Verde', 'Azul', 'Violeta', 'Gris', 'Blanco'];
  tolerancias: string[] = ['Oro', 'Plata'];

  valoresColores: { [key: string]: number } = {
    'Negro': 0,
    'Marrón': 1,
    'Rojo': 2,
    'Naranja': 3,
    'Amarillo': 4,
    'Verde': 5,
    'Azul': 6,
    'Violeta': 7,
    'Gris': 8,
    'Blanco': 9
  };

  multiplicadoresColores: { [key: string]: number } = {
    'Negro': 1,
    'Marrón': 10,
    'Rojo': 100,
    'Naranja': 1000,
    'Amarillo': 10000,
    'Verde': 100000,
    'Azul': 1000000,
    'Violeta': 10000000,
    'Gris': 0.1,
    'Blanco': 0.01
  };

  toleranciasValores: { [key: string]: number } = {
    'Oro': 5,
    'Plata': 10
  };

  resultado: any[] = [];
  mostrarResultados: boolean = false;

  ngOnInit(): void {
    this.formulario = new FormGroup({
      color1: new FormControl('', Validators.required),
      color2: new FormControl('', Validators.required),
      color3: new FormControl('', Validators.required),
      tolerancia: new FormControl('', Validators.required)
    });

    // Borrar localStorage cuando se refresca la página
    window.onload = () => {
      localStorage.clear();
    };
  }

  // Función para registrar los datos y guardarlos en el localStorage
  registrar(): void {
    const { color1, color2, color3, tolerancia } = this.formulario.value;

    const valorBase = this.calcularValor(color1, color2);
    const multiplicador = this.obtenerMultiplicador(color3);
    const valor = valorBase * multiplicador;

    const toleranciaPorcentaje = this.toleranciasValores[tolerancia];
    const valorMaximo = valor + (valor * (toleranciaPorcentaje / 100));
    const valorMinimo = valor - (valor * (toleranciaPorcentaje / 100));

    const resistencia = {
      color1,
      color2,
      color3,
      tolerancia,
      valor,
      valorMaximo,
      valorMinimo
    };

    // Guardar solo los colores y la tolerancia en el localStorage
    localStorage.setItem('coloresYtolerancia', JSON.stringify({
      color1,
      color2,
      color3,
      tolerancia
    }));

    // Guardar la resistencia completa para mostrar los resultados
    let resistenciasGuardadas = JSON.parse(localStorage.getItem('resistencias') || '[]');
    resistenciasGuardadas.push(resistencia);
    localStorage.setItem('resistencias', JSON.stringify(resistenciasGuardadas));

    this.resultado = resistenciasGuardadas;
  }

  // Función para imprimir los datos del localStorage
  imprimirDatos(): void {
    const datosGuardados = localStorage.getItem('resistencias');
    if (datosGuardados) {
      this.resultado = JSON.parse(datosGuardados);
      this.mostrarResultados = true;
    } else {
      this.mostrarResultados = false;
    }
  }

  calcularValor(color1: string, color2: string): number {
    return (this.valoresColores[color1] * 10) + this.valoresColores[color2];
  }

  obtenerMultiplicador(color: string): number {
    return this.multiplicadoresColores[color];
  }

  obtenerColorHex(color: string): string {
    const coloresHex: { [key: string]: string } = {
      'Negro': '#000000',
      'Marrón': '#8B4513',
      'Rojo': '#FF0000',
      'Naranja': '#FFA500',
      'Amarillo': '#FFFF00',
      'Verde': '#008000',
      'Azul': '#0000FF',
      'Violeta': '#EE82EE',
      'Gris': '#808080',
      'Blanco': '#FFFFFF',
      'Oro': '#FFD700',
      'Plata': '#C0C0C0'
    };
    return coloresHex[color] || '#FFFFFF';
  }
}
