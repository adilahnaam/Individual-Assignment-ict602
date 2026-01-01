import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  private auth = inject(AuthService);
  private chat_service = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  chatForm!: FormGroup;

  constructor() {
    this.chatForm = this.fb.group({
      chat_message: ['', Validators.required]
    });
  }

  async logOut() {
    await this.auth.signOut(); // ✅ sekarang wujud
    this.router.navigate(['/login']);
  }

  onSubmit() {
    const formValue = this.chatForm.value.chat_message;
    console.log(formValue);
  }
}


