import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule para *ngIf

@Component({
  selector: 'app-zodiaco', // Define el selector del componente
  standalone: true, // Permite que el componente sea independiente
  imports: [ReactiveFormsModule, CommonModule], // Importa módulos necesarios
  templateUrl: './zodiaco.component.html', // Plantilla del componente
  styleUrl: './zodiaco.component.css' // Archivo CSS del componente
})
export class ZodiacoComponent {
  // Declaración del formulario y variables para almacenar los resultados
  formularioInformacionPersonal: FormGroup;
  edad: number | null = null; // Almacena la edad calculada
  signoZodiacalChino: string | null = null; // Almacena el signo zodiacal chino
  imagenSignoZodiacalChino: string | null = null; // Ruta de la imagen del signo zodiacal
  saludo: string | null = null; // Cadena de saludo con el nombre completo del usuario

  constructor(private fb: FormBuilder) {
    // Inicializa el formulario usando FormBuilder
    this.formularioInformacionPersonal = this.fb.group({
      nombre: ['', Validators.required], // Campo obligatorio para el nombre
      apellidoPaterno: ['', Validators.required], // Campo obligatorio para el apellido paterno
      apellidoMaterno: ['', Validators.required], // Campo obligatorio para el apellido materno
      dia: ['', [Validators.required, Validators.min(1), Validators.max(31)]], // Día válido entre 1 y 31
      mes: ['', [Validators.required, Validators.min(1), Validators.max(12)]], // Mes válido entre 1 y 12
      anio: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]], // Año entre 1900 y el año actual
      sexo: ['', Validators.required] // Campo obligatorio para seleccionar el sexo
    });
  }

  // Método para calcular la edad y el signo zodiacal chino
  calcularEdadYSigno() {
    const dia = this.formularioInformacionPersonal.get('dia')?.value; // Obtiene el día del formulario
    const mes = this.formularioInformacionPersonal.get('mes')?.value; // Obtiene el mes del formulario
    const anio = this.formularioInformacionPersonal.get('anio')?.value; // Obtiene el año del formulario
    const nombre = this.formularioInformacionPersonal.get('nombre')?.value; // Obtiene el nombre
    const apellidoPaterno = this.formularioInformacionPersonal.get('apellidoPaterno')?.value; // Obtiene el apellido paterno
    const apellidoMaterno = this.formularioInformacionPersonal.get('apellidoMaterno')?.value; // Obtiene el apellido materno

    // Calcula la edad basándose en la fecha actual y la fecha de nacimiento
    const fechaNacimiento = new Date(anio, mes - 1, dia); // Crea una fecha de nacimiento
    const hoy = new Date(); // Fecha actual
    this.edad = hoy.getFullYear() - fechaNacimiento.getFullYear(); // Diferencia de años
    const diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      this.edad--; // Ajusta la edad si el cumpleaños no ha pasado aún
    }

    // Calcula el signo zodiacal chino basándose en el año de nacimiento
    this.signoZodiacalChino = this.obtenerSignoZodiacalChino(anio);

    // Define la ruta de la imagen correspondiente al signo zodiacal chino
    this.imagenSignoZodiacalChino = `assets/imagenes-zodiac/${this.signoZodiacalChino.toLowerCase()}.png`;

    // Forma el saludo con el nombre completo del usuario
    this.saludo = `${nombre} ${apellidoPaterno} ${apellidoMaterno}`;
  }

  // Método para obtener el signo zodiacal chino según el año de nacimiento
  obtenerSignoZodiacalChino(anio: number): string {
    // Lista de signos zodiacales chinos
    const signosZodiacalesChinos = [
      'Rata', 'Buey', 'Tigre', 'Conejo', 'Dragon', 'Serpiente', 'Caballo', 'Cabra',
      'Mono', 'Gallo', 'Perro', 'Cerdo'
    ];
    // Calcula el índice del signo zodiacal usando el año y la lógica del ciclo de 12 años
    const indice = (anio - 1900) % 12;
    return signosZodiacalesChinos[indice]; // Devuelve el signo zodiacal correspondiente
  }
}
