import { useState } from "react"
import { PageLayout } from "../../../shared/layout/PageLayout"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"

interface UserProfile {
  name: string
  email: string
  role: string
  department: string
  phone: string
  joinDate: string
}

interface ProfileSettings {
  emailNotifications: boolean
  desktopNotifications: boolean
  darkMode: boolean
  language: string
}

export const PerfilPage = () => {
  const [activeTab, setActiveTab] = useState("perfil")
  const [isEditing, setIsEditing] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Juan Pérez",
    email: "juan.perez@camioneros.com",
    role: "Inspector Senior",
    department: "Fiscalización",
    phone: "+54 11 4567-8900",
    joinDate: "2022-03-15"
  })

  const [settings, setSettings] = useState<ProfileSettings>({
    emailNotifications: true,
    desktopNotifications: false,
    darkMode: false,
    language: "es"
  })

  const tabs = [
    { id: "perfil", label: "Perfil"  },
    { id: "seguridad", label: "Seguridad"  },
    { id: "notificaciones", label: "Notificaciones"  },
    { id: "rendimiento", label: "Rendimiento"  },
    { id: "integraciones", label: "Integraciones"  }
  ]

  const handleSaveProfile = () => {
    // TODO: Implement actual profile update
    console.log("Saving profile:", userProfile)
    setIsEditing(false)
  }

  const handleSettingChange = (key: keyof ProfileSettings, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    // TODO: Implement actual settings update
    console.log("Setting changed:", key, value)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "perfil":
        return (
          <div className="space-y-8">
            <div className="bg-white ">
              <div className="p-0 border-b border-slate-200/50">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-semibold text-slate-800">Información Personal</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="border-emerald-200 text-emerald-600 hover:bg-emerald-700 cursor-pointer"
                  >
                    {isEditing ? "Cancelar" : "Editar"}
                  </Button>
                </div>
              </div>
              <div className="p-2 pt-5 space-y-2">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-1">
                    <Label className="text-slate-700 font-black">Nombre completo</Label>
                    {isEditing ? (
                      <Input
                        value={userProfile.name}
                        onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                        className="border-slate-200 focus:border-emerald-500"
                      />
                    ) : (
                      <p className="text-slate-900 py-1 text-sm ml-1">{userProfile.name}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label className="text-slate-700 font-black">Email</Label>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={userProfile.email}
                        onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                        className="border-slate-200 focus:border-emerald-500"
                      />
                    ) : (
                      <p className="text-slate-900 py-1 text-sm ml-1">{userProfile.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-black">Cargo</Label>
                    {isEditing ? (
                      <Input
                        value={userProfile.role}
                        onChange={(e) => setUserProfile({...userProfile, role: e.target.value})}
                        className="border-slate-200 focus:border-emerald-500"
                      />
                    ) : (
                      <p className="text-slate-900 py-1 text-sm ml-1">{userProfile.role}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-black">Departamento</Label>
                    {isEditing ? (
                      <Input
                        value={userProfile.department}
                        onChange={(e) => setUserProfile({...userProfile, department: e.target.value})}
                        className="border-slate-200 focus:border-emerald-500"
                      />
                    ) : (
                      <p className="text-slate-900 py-1 text-sm ml-1">{userProfile.department}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-black">Teléfono</Label>
                    {isEditing ? (
                      <Input
                        value={userProfile.phone}
                        onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                        className="border-slate-200 focus:border-emerald-500"
                      />
                    ) : (
                      <p className="text-slate-900 py-1 text-sm ml-1">{userProfile.phone}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-black">Fecha de ingreso</Label>
                    <p className="text-slate-900 py-1 text-sm ml-1">
                      {new Date(userProfile.joinDate).toLocaleDateString('es-AR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                {isEditing && (
                  <div className="pt-4 border-t border-slate-200/50">
                    <Button
                      onClick={handleSaveProfile}
                      className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer text-white px-6"
                    >
                      Guardar Cambios
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case "seguridad":
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-xl border border-slate-200/50 shadow-sm">
              <div className="p-8 border-b border-slate-200/50">
                <h2 className="text-xl font-semibold text-slate-800">Seguridad</h2>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">Contraseña actual</Label>
                  <Input type="password" placeholder="••••••••" className="border-slate-200 focus:border-emerald-500" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">Nueva contraseña</Label>
                  <Input type="password" placeholder="••••••••" className="border-slate-200 focus:border-emerald-500" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">Confirmar nueva contraseña</Label>
                  <Input type="password" placeholder="••••••••" className="border-slate-200 focus:border-emerald-500" />
                </div>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6">
                  Actualizar Contraseña
                </Button>
              </div>
            </div>
          </div>
        )

      case "notificaciones":
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-xl border border-slate-200/50 shadow-sm">
              <div className="p-8 border-b border-slate-200/50">
                <h2 className="text-xl font-semibold text-slate-800">Configuración de Notificaciones</h2>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-700 font-medium">Notificaciones</Label>
                    <p className="text-sm text-slate-500">Recibir alertas de inspecciones vencidas y recordatorios (recomendado)</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.emailNotifications ? 'bg-emerald-600' : 'bg-slate-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-700 font-medium">Notificaciones de escritorio</Label>
                    <p className="text-sm text-slate-500">Mostrar alertas en el navegador</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('desktopNotifications', !settings.desktopNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.desktopNotifications ? 'bg-emerald-600' : 'bg-slate-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.desktopNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <div>
                  <Label className="text-slate-700 font-medium">Idioma</Label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                    className="mt-1 block w-full border border-slate-200 rounded-lg px-3 py-2 focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )

      case "rendimiento":
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-xl border border-slate-200/50 shadow-sm">
              <div className="p-8 border-b border-slate-200/50">
                <h2 className="text-xl font-semibold text-slate-800">Estadísticas de Rendimiento</h2>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-slate-600">Este mes</span>
                    <span className="text-xs text-slate-500">Enero 2025</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-slate-700">Total inspecciones</span>
                      </div>
                      <span className="text-lg font-semibold text-slate-800">24</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-slate-700">Completadas</span>
                      </div>
                      <span className="text-lg font-semibold text-green-600">18</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                        <span className="text-sm text-slate-700">Pendientes</span>
                      </div>
                      <span className="text-lg font-semibold text-amber-600">6</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-600">Tasa de finalización</span>
                    <span className="text-sm font-semibold text-slate-800">75%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "integraciones":
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-xl border border-slate-200/50 shadow-sm">
              <div className="p-8 border-b border-slate-200/50">
                <h2 className="text-xl font-semibold text-slate-800">Integraciones</h2>
              </div>
              <div className="p-8 space-y-6">
                <div className="text-center py-12">
                  <div className="text-slate-400 text-6xl mb-4">🔗</div>
                  <h3 className="text-lg font-medium text-slate-800 mb-2">Próximamente</h3>
                  <p className="text-slate-600">Las integraciones con sistemas externos estarán disponibles en futuras versiones.</p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <PageLayout>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            {/* <h1 className="text-3xl font-bold text-slate-800">Configuración</h1> */}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white overflow-hidden">
          <div className="border-b border-slate-200/50">
            <nav className="flex space-x-8 px-8 py-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`cursor-pointer flex items-center py-2 text-sm font-medium transition-colors mr-4 ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-emerald-600 rounded-md px-3'
                      : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}