import { ValidationError } from '@/exceptions/ValidationException';
import { CreateUserDto } from '@/dtos/users.dto';
import { UserModel } from '@/models/users.model';
import { FormService } from '@/services/form.service';

export class RegistrationValidator {
  private formService: FormService;
  constructor(private user: CreateUserDto) {
    this.formService = new FormService();
  }

  async validate() {
    await this.validateInput();
    await this.validateNameUniqueness();
    await this.validateEmailUniqueness();
  }

  private async validateInput() {
    if (this.user.name.length > 255) {
      throw new ValidationError('name', 'Username must be shorter than 256 characters!');
    }

    if (this.user.email.length > 255) {
      throw new ValidationError('email', 'Email must be shorter than 256 characters!');
    }

    if (
      !this.user.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    ) {
      throw new ValidationError('email', 'Email must be in xxxx@xxx.xxx format');
    }

    if (this.user.password != this.user.confirmPassword) {
      throw new ValidationError('password', 'Password must match confirmation!');
    }

    if (!this.user.password.match(/^(?=.*\d).{4,12}$/)) {
      throw new ValidationError('password', 'Password must be between 4 and 12 characters and contain a digit!');
    }

    const availableGenres = await this.formService.fetchNations();
    if (this.user.nationality && !availableGenres.find(nation => nation.id === this.user.nationality)) {
      throw new ValidationError('nationality', 'Unavailable nationality selected!');
    }
  }

  private async validateNameUniqueness() {
    const matchingUsername = await UserModel.query().select().where({ name: this.user.name }).first();

    if (matchingUsername) {
      throw new ValidationError('name', 'Username is already taken!');
    }
  }

  private async validateEmailUniqueness() {
    const matchingEmail = await UserModel.query().select().where({ email: this.user.email }).first();

    if (matchingEmail) {
      throw new ValidationError('email', 'Email is already in use!');
    }
  }
}
