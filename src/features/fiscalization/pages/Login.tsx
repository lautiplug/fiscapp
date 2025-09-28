import { useState } from "react"
import { cn } from "../../../lib/utils"
import { Button } from "../../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { useNavigate } from "react-router-dom"
import TruckLogo from '../../../icons/truck.png'

interface LoginForm {
  email: string
  password: string
}

interface SignupForm extends LoginForm {
  name: string
  confirmPassword: string
}

export function Login({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [loginForm, setLoginForm] = useState<LoginForm>({ email: "", password: "" })
  const [signupForm, setSignupForm] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // TODO: Implement actual authentication
    console.log("Login attempt:", loginForm)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      navigate("/inicio") // Navigate on successful login
    }, 1000)
  }

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (signupForm.password !== signupForm.confirmPassword) {
      alert("Las contraseñas no coinciden")
      setIsLoading(false)
      return
    }

    // TODO: Implement actual user creation
    console.log("Signup attempt:", signupForm)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsLogin(true) // Switch to login after successful signup
    }, 1000)
  }

  const handleGoogleAuth = () => {
    setIsLoading(true)
    // TODO: Implement Google OAuth
    console.log("Google OAuth attempt")
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className={cn("min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50/30", className)} {...props}>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <img width="32px" src={TruckLogo} alt="FiscUp logo" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">FiscUp</h1>
          </div>
        </div>

        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold text-center text-slate-800">
              {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
            </CardTitle>
            <CardDescription className="text-center text-slate-600">
              {isLogin
                ? "Ingresa tus credenciales para continuar"
                : "Completa tus datos para comenzar"
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Google OAuth Button */}
            <Button
              variant="outline"
              className="cursor-pointer w-full py-3 border-slate-200 hover:bg-blue-700 transition-all duration-200"
              onClick={handleGoogleAuth}
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuar con Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">O continúa con email</span>
              </div>
            </div>

            {/* Login Form */}
            {isLogin ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-slate-700 font-medium">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="email@camioneros.com"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password" className="text-slate-700 font-medium">Contraseña</Label>
                    <button
                      type="button"
                      className="cursor-pointer text-sm text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full py-3 bg-blue-700 text-white font-medium shadow-lg shadow-blue-500/25 transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
              </form>
            ) : (
              /* Signup Form */
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-slate-700 font-medium">Nombre completo</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Juan Pérez"
                    value={signupForm.name}
                    onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                    className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-slate-700 font-medium">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="email@camioneros.com"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                    className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-slate-700 font-medium">Contraseña</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                    className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password" className="text-slate-700 font-medium">Confirmar contraseña</Label>
                  <Input
                    id="signup-confirm-password"
                    type="password"
                    value={signupForm.confirmPassword}
                    onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})}
                    className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full py-3 bg-blue-700 text-white font-medium shadow-lg shadow-blue-500/25 transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
                </Button>
              </form>
            )}

            {/* Toggle between login/signup */}
            <div className="text-center text-sm">
              {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="cursor-pointer text-blue-600 bg-bluee-600 hover:text-blue-700 font-medium underline-offset-4 hover:underline"
              >
                {isLogin ? "Crear cuenta" : "Iniciar sesión"}
              </button>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  )
}