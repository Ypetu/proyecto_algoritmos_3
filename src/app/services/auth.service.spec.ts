import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { API_LOGIN, API_KEY } from '../app.config';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería hacer login y devolver el token', () => {
    const mockRequest = { email: 'test@mail.com', password: 'Password123!' };
    const mockResponse = { token: '12345' };

    service.login(mockRequest).subscribe(response => {
      expect(response.token).toBe('12345');
    });

    const req = httpMock.expectOne(API_LOGIN);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('x-api-key')).toBe(API_KEY);
    req.flush(mockResponse);
  });
});
