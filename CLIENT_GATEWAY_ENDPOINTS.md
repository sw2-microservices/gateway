# Client Gateway - Nuevos Endpoints para Aerolíneas

## 🌐 **Endpoints REST Agregados**

Se han agregado 2 nuevos endpoints REST al client-gateway que consumen los microservicios de auth:

---

## 🔗 **1. Registro de Suscripción de Aerolínea**

### **Endpoint:** `POST /auth/register-subscription`

**Descripción:** Registra una nueva aerolínea con su administrador y suscripción en un solo request.

**Body (JSON):**
```json
{
  "airline": {
    "airline_name": "Aerolínea Internacional XYZ",
    "alias": "xyz-airlines",
    "country": "Bolivia", 
    "contact_email": "info@xyzairlines.com",
    "phone_number": "+591 2 2345678"
  },
  "admin": {
    "admin_name": "Juan Pérez",
    "admin_email": "admin@xyzairlines.com", 
    "admin_password": "MiPassword123!",
    "admin_phone": "+591 70123456"
  },
  "payment": {
    "card_number": "1234567890123456",
    "cardholder_name": "Juan Pérez",
    "expiry_date": "12/25",
    "cvv": "123",
    "plan": "premium"
  }
}
```

**Response exitosa (200):**
```json
{
  "user": {
    "id": "676c1234567890abcdef1234",
    "admin_name": "Juan Pérez",
    "admin_email": "admin@xyzairlines.com",
    "role": "admin",
    "airline": {
      "id": "676c1234567890abcdef5678",
      "airline_name": "Aerolínea Internacional XYZ",
      "alias": "xyz-airlines",
      "country": "Bolivia"
    }
  },
  "airline": {
    "id": "676c1234567890abcdef5678",
    "airline_name": "Aerolínea Internacional XYZ",
    "alias": "xyz-airlines", 
    "country": "Bolivia",
    "contact_email": "info@xyzairlines.com"
  },
  "subscription": {
    "id": "676c1234567890abcdef9012",
    "plan": "premium",
    "status": "active"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errores posibles (400):**
```json
{
  "message": "Ya existe una aerolínea con el alias: xyz-airlines"
}
```
```json
{
  "message": "Ya existe una aerolínea registrada con el email: info@xyzairlines.com"
}
```
```json
{
  "message": "Ya existe un administrador con el email: admin@xyzairlines.com"
}
```

---

## 🔐 **2. Login de Administrador de Aerolínea**

### **Endpoint:** `POST /auth/login-airline`

**Descripción:** Autentica a un administrador de aerolínea y devuelve sus datos completos.

**Body (JSON):**
```json
{
  "admin_email": "admin@xyzairlines.com",
  "admin_password": "MiPassword123!"
}
```

**Response exitosa (200):**
```json
{
  "user": {
    "id": "676c1234567890abcdef1234",
    "admin_name": "Juan Pérez", 
    "admin_email": "admin@xyzairlines.com",
    "role": "admin",
    "airline": {
      "id": "676c1234567890abcdef5678",
      "airline_name": "Aerolínea Internacional XYZ",
      "alias": "xyz-airlines",
      "country": "Bolivia"
    }
  },
  "airline": {
    "id": "676c1234567890abcdef5678",
    "airline_name": "Aerolínea Internacional XYZ",
    "alias": "xyz-airlines",
    "country": "Bolivia", 
    "contact_email": "info@xyzairlines.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error de autenticación (400):**
```json
{
  "message": "Email/Contraseña no válidos"
}
```

---

## 🔧 **Integración con el Frontend Angular**

### **Desde SubscriptionComponent:**

```typescript
// En el método submitSubscription()
submitSubscription() {
  if (this.airlineForm.valid && this.adminForm.valid && this.paymentForm.valid) {
    this.isSubmitting.set(true);

    const subscriptionData = {
      airline: this.airlineForm.value,
      admin: this.adminForm.value,
      payment: this.paymentForm.value
    };

    // Llamada HTTP al client-gateway
    this.http.post('http://localhost:3000/auth/register-subscription', subscriptionData)
      .subscribe({
        next: (response) => {
          console.log('Suscripción exitosa:', response);
          this.isSubmitting.set(false);
          this.submissionSuccess.set(true);
          
          // Guardar token en localStorage/sessionStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('airline', JSON.stringify(response.airline));
          
          // Redirigir al dashboard de la aerolínea
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 3000);
        },
        error: (error) => {
          console.error('Error en suscripción:', error);
          this.isSubmitting.set(false);
          // Mostrar mensaje de error al usuario
        }
      });
  }
}
```

### **Para el Login Component:**

```typescript
// En el método de login
login() {
  if (this.loginForm.valid) {
    const loginData = {
      admin_email: this.loginForm.value.admin_email,
      admin_password: this.loginForm.value.admin_password
    };

    this.http.post('http://localhost:3000/auth/login-airline', loginData)
      .subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);
          
          // Guardar datos de sesión
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('airline', JSON.stringify(response.airline));
          
          // Redirigir al dashboard
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error en login:', error);
          // Mostrar mensaje de error
        }
      });
  }
}
```

---

## 📋 **Validaciones Automáticas**

El client-gateway valida automáticamente:

### **RegisterSubscriptionDto:**
- ✅ **airline_name**: Mínimo 3 caracteres
- ✅ **alias**: Mínimo 2 caracteres  
- ✅ **country**: Mínimo 2 caracteres
- ✅ **contact_email**: Formato de email válido
- ✅ **phone_number**: Mínimo 7 caracteres
- ✅ **admin_name**: Mínimo 2 caracteres
- ✅ **admin_email**: Formato de email válido
- ✅ **admin_password**: Contraseña segura (8+ chars, mayús, minús, números)
- ✅ **card_number**: Exactamente 16 dígitos
- ✅ **cardholder_name**: Mínimo 2 caracteres
- ✅ **expiry_date**: Formato MM/YY
- ✅ **cvv**: 3-4 dígitos

### **LoginAirlineDto:**
- ✅ **admin_email**: Formato de email válido
- ✅ **admin_password**: Campo requerido

---

## 🚀 **Estado Actual**

✅ **Auth-MS**: Completamente implementado con nuevas entidades y endpoints
✅ **Client-Gateway**: Nuevos endpoints REST agregados y funcionando  
⏳ **Frontend**: Pendiente de conectar con los nuevos endpoints

**Siguiente paso:** Conectar el frontend Angular con estos endpoints para completar el flujo de suscripción.
