import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
/*import { Ejemplo1Component } from "./formularios/ejemplo1/ejemplo1.component";
import { ZodiacoComponent } from "./formularios/zodiaco/zodiaco.component";
import { EmpleadosComponent } from "./formularios/empleados/empleados.component";*/


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, /*Ejemplo1Component, ZodiacoComponent*/],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularSegundo';
}
