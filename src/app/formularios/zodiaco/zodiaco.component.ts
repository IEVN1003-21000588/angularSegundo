import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule para *ngIf

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,],
  templateUrl: './zodiaco.component.html',
  styleUrl: './zodiaco.component.css'
})
export class ZodiacoComponent {
  formularioInformacionPersonal: FormGroup;
  edad: number | null = null;
  signoZodiacal: string | null = null;
  imagenSignoZodiacal: string | null = null;
  saludo: string | null = null;

  constructor(private fb: FormBuilder) {
    this.formularioInformacionPersonal = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      dia: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
      mes: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      anio: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      sexo: ['', Validators.required]
    });
  }

  calcularEdadYSigno() {
    const dia = this.formularioInformacionPersonal.get('dia')?.value;
    const mes = this.formularioInformacionPersonal.get('mes')?.value;
    const anio = this.formularioInformacionPersonal.get('anio')?.value;
    const nombre = this.formularioInformacionPersonal.get('nombre')?.value;
    const apellidoPaterno = this.formularioInformacionPersonal.get('apellidoPaterno')?.value;
    const apellidoMaterno = this.formularioInformacionPersonal.get('apellidoMaterno')?.value;

    const fechaNacimiento = new Date(anio, mes - 1, dia);
    const hoy = new Date();
    this.edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      this.edad--;
    }

    this.signoZodiacal = this.obtenerSignoZodiacal(dia, mes);
    this.imagenSignoZodiacal = `assets/imagenes-zodiac/${this.signoZodiacal.toLowerCase()}.png`;
    this.saludo = `${nombre} ${apellidoPaterno} ${apellidoMaterno}`;
  }

  obtenerSignoZodiacal(dia: number, mes: number): string {
    const signosZodiacales = [
      { signo: 'Capricornio', inicio: new Date(0, 0, 1), fin: new Date(0, 0, 19) },
      { signo: 'Acuario', inicio: new Date(0, 0, 20), fin: new Date(0, 1, 18) },
      { signo: 'Piscis', inicio: new Date(0, 1, 19), fin: new Date(0, 2, 20) },
      { signo: 'Aries', inicio: new Date(0, 2, 21), fin: new Date(0, 3, 19) },
      { signo: 'Tauro', inicio: new Date(0, 3, 20), fin: new Date(0, 4, 20) },
      { signo: 'Geminis', inicio: new Date(0, 4, 21), fin: new Date(0, 5, 20) },
      { signo: 'Cancer', inicio: new Date(0, 5, 21), fin: new Date(0, 6, 22) },
      { signo: 'Leo', inicio: new Date(0, 6, 23), fin: new Date(0, 7, 22) },
      { signo: 'Virgo', inicio: new Date(0, 7, 23), fin: new Date(0, 8, 22) },
      { signo: 'Libra', inicio: new Date(0, 8, 23), fin: new Date(0, 9, 22) },
      { signo: 'Escorpio', inicio: new Date(0, 9, 23), fin: new Date(0, 10, 21) },
      { signo: 'Sagitario', inicio: new Date(0, 10, 22), fin: new Date(0, 11, 21) },
      { signo: 'Capricornio', inicio: new Date(0, 11, 22), fin: new Date(0, 11, 31) }
    ];

    const fechaNacimiento = new Date(0, mes - 1, dia);
    return signosZodiacales.find(signo => fechaNacimiento >= signo.inicio && fechaNacimiento <= signo.fin)?.signo || '';
  }
}
