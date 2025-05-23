import React, { useState, useEffect } from "react";
import {
  User,
  Shield,
  Heart,
  Phone,
  FileText,
  AlertTriangle,
  Plus,
  Edit2,
  Save,
  X,
  Eye,
  EyeOff,
  Lock,
  UserPlus,
  LogIn,
} from "lucide-react";

const MedAlert = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [users, setUsers] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);

  // Initialize with demo data
  useEffect(() => {
    const demoUsers = [
      {
        id: 1,
        username: "john.doe",
        email: "john.doe@email.com",
        password: "demo123",
        profile: {
          firstName: "John",
          lastName: "Doe",
          dateOfBirth: "1985-03-15",
          bloodType: "O+",
          height: "175 cm",
          weight: "75 kg",
        },
        medicalHistory: [
          {
            id: 1,
            type: "Chronic Condition",
            condition: "Hypertension",
            diagnosedDate: "2020-05-10",
            status: "Active",
            notes: "Controlled with medication",
          },
          {
            id: 2,
            type: "Allergy",
            condition: "Penicillin",
            severity: "Severe",
            notes: "Causes anaphylaxis",
          },
        ],
        medications: [
          {
            id: 1,
            name: "Lisinopril",
            dosage: "10mg",
            frequency: "Once daily",
            prescribedBy: "Dr. Smith",
            startDate: "2020-05-15",
          },
        ],
        emergencyContacts: [
          {
            id: 1,
            name: "Jane Doe",
            relationship: "Spouse",
            phone: "+1-555-0123",
            email: "jane.doe@email.com",
          },
          {
            id: 2,
            name: "Emergency Services",
            relationship: "Emergency",
            phone: "911",
            email: "",
          },
        ],
      },
    ];
    setUsers(demoUsers);
  }, []);

  const handleLogin = (credentials) => {
    const user = users.find(
      (u) =>
        (u.username === credentials.username ||
          u.email === credentials.username) &&
        u.password === credentials.password
    );

    if (user) {
      setCurrentUser(user);
      setActiveTab("dashboard");
    } else {
      alert("Invalid credentials. Try username: john.doe, password: demo123");
    }
  };

  const handleRegister = (userData) => {
    const newUser = {
      id: users.length + 1,
      ...userData,
      profile: {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        bloodType: "",
        height: "",
        weight: "",
      },
      medicalHistory: [],
      medications: [],
      emergencyContacts: [],
    };

    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setActiveTab("dashboard");
  };

  const updateUserData = (section, data) => {
    const updatedUser = { ...currentUser };
    if (section === "profile") {
      updatedUser.profile = { ...updatedUser.profile, ...data };
    } else if (section === "medicalHistory") {
      updatedUser.medicalHistory = data;
    } else if (section === "medications") {
      updatedUser.medications = data;
    } else if (section === "emergencyContacts") {
      updatedUser.emergencyContacts = data;
    }

    setCurrentUser(updatedUser);
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
  };

  const AuthForm = () => {
    const [credentials, setCredentials] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (isLogin) {
        handleLogin(credentials);
      } else {
        if (credentials.password !== credentials.confirmPassword) {
          alert("Passwords do not match");
          return;
        }
        handleRegister(credentials);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-12 w-12 text-blue-600 mr-2" />
              <h1 className="text-3xl font-bold text-gray-900">MedAlert</h1>
            </div>
            <p className="text-gray-600">
              Secure Medical Information Management
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username {!isLogin && "/ Email"}
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                placeholder={isLogin ? "Username or Email" : "Username"}
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                  placeholder="your@email.com"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={credentials.confirmPassword}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
            >
              {isLogin ? (
                <LogIn className="h-4 w-4 mr-2" />
              ) : (
                <UserPlus className="h-4 w-4 mr-2" />
              )}
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>

          {isLogin && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Demo Account:</strong>
                <br />
                Username: john.doe
                <br />
                Password: demo123
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Welcome back, {currentUser.profile.firstName || currentUser.username}!
        </h2>
        <p className="text-blue-100">
          Your medical information is secure and accessible.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">
                Medical Conditions
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {currentUser.medicalHistory.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">
                Active Medications
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {currentUser.medications.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center">
            <Phone className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">
                Emergency Contacts
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {currentUser.emergencyContacts.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-purple-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">
                Profile Status
              </p>
              <p className="text-2xl font-semibold text-gray-900">Secure</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Emergency Access:</strong> Your medical information can be
              accessed by authorized emergency personnel using your emergency
              ID.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const ProfileTab = () => {
    const [editing, setEditing] = useState(false);
    const [profileData, setProfileData] = useState(currentUser.profile);

    const handleSave = () => {
      updateUserData("profile", profileData);
      setEditing(false);
    };

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Personal Profile</h3>
          <button
            onClick={() => (editing ? handleSave() : setEditing(true))}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {editing ? (
              <Save className="h-4 w-4 mr-2" />
            ) : (
              <Edit2 className="h-4 w-4 mr-2" />
            )}
            {editing ? "Save" : "Edit"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              disabled={!editing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              value={profileData.firstName}
              onChange={(e) =>
                setProfileData({ ...profileData, firstName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              disabled={!editing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              value={profileData.lastName}
              onChange={(e) =>
                setProfileData({ ...profileData, lastName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              disabled={!editing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              value={profileData.dateOfBirth}
              onChange={(e) =>
                setProfileData({ ...profileData, dateOfBirth: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blood Type
            </label>
            <select
              disabled={!editing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              value={profileData.bloodType}
              onChange={(e) =>
                setProfileData({ ...profileData, bloodType: e.target.value })
              }
            >
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Height
            </label>
            <input
              type="text"
              disabled={!editing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              value={profileData.height}
              onChange={(e) =>
                setProfileData({ ...profileData, height: e.target.value })
              }
              placeholder="e.g., 175 cm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weight
            </label>
            <input
              type="text"
              disabled={!editing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              value={profileData.weight}
              onChange={(e) =>
                setProfileData({ ...profileData, weight: e.target.value })
              }
              placeholder="e.g., 75 kg"
            />
          </div>
        </div>
      </div>
    );
  };

  const MedicalHistoryTab = () => {
    const [records, setRecords] = useState(currentUser.medicalHistory);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newRecord, setNewRecord] = useState({
      type: "",
      condition: "",
      diagnosedDate: "",
      status: "",
      severity: "",
      notes: "",
    });

    const addRecord = () => {
      const record = {
        id: Date.now(),
        ...newRecord,
      };
      const updatedRecords = [...records, record];
      setRecords(updatedRecords);
      updateUserData("medicalHistory", updatedRecords);
      setNewRecord({
        type: "",
        condition: "",
        diagnosedDate: "",
        status: "",
        severity: "",
        notes: "",
      });
      setShowAddForm(false);
    };

    const deleteRecord = (id) => {
      const updatedRecords = records.filter((r) => r.id !== id);
      setRecords(updatedRecords);
      updateUserData("medicalHistory", updatedRecords);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Medical History</h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Record
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <h4 className="text-md font-semibold mb-4">Add Medical Record</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newRecord.type}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, type: e.target.value })
                  }
                >
                  <option value="">Select Type</option>
                  <option value="Chronic Condition">Chronic Condition</option>
                  <option value="Allergy">Allergy</option>
                  <option value="Surgery">Surgery</option>
                  <option value="Hospitalization">Hospitalization</option>
                  <option value="Vaccination">Vaccination</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Condition/Procedure
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newRecord.condition}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, condition: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newRecord.diagnosedDate}
                  onChange={(e) =>
                    setNewRecord({
                      ...newRecord,
                      diagnosedDate: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status/Severity
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newRecord.status || newRecord.severity}
                  onChange={(e) =>
                    setNewRecord({
                      ...newRecord,
                      status: e.target.value,
                      severity: e.target.value,
                    })
                  }
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  value={newRecord.notes}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, notes: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={addRecord}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Add Record
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {records.map((record) => (
            <div
              key={record.id}
              className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                      {record.type}
                    </span>
                    {(record.status || record.severity) && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded">
                        {record.status || record.severity}
                      </span>
                    )}
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    {record.condition}
                  </h4>
                  {record.diagnosedDate && (
                    <p className="text-sm text-gray-600 mt-1">
                      Date: {record.diagnosedDate}
                    </p>
                  )}
                  {record.notes && (
                    <p className="text-sm text-gray-600 mt-2">{record.notes}</p>
                  )}
                </div>
                <button
                  onClick={() => deleteRecord(record.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {records.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No medical records yet. Add your first record to get started.</p>
          </div>
        )}
      </div>
    );
  };

  const MedicationsTab = () => {
    const [medications, setMedications] = useState(currentUser.medications);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newMedication, setNewMedication] = useState({
      name: "",
      dosage: "",
      frequency: "",
      prescribedBy: "",
      startDate: "",
    });

    const addMedication = () => {
      const medication = {
        id: Date.now(),
        ...newMedication,
      };
      const updatedMedications = [...medications, medication];
      setMedications(updatedMedications);
      updateUserData("medications", updatedMedications);
      setNewMedication({
        name: "",
        dosage: "",
        frequency: "",
        prescribedBy: "",
        startDate: "",
      });
      setShowAddForm(false);
    };

    const deleteMedication = (id) => {
      const updatedMedications = medications.filter((m) => m.id !== id);
      setMedications(updatedMedications);
      updateUserData("medications", updatedMedications);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Current Medications</h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Medication
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <h4 className="text-md font-semibold mb-4">Add Medication</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medication Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newMedication.name}
                  onChange={(e) =>
                    setNewMedication({ ...newMedication, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dosage
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newMedication.dosage}
                  onChange={(e) =>
                    setNewMedication({
                      ...newMedication,
                      dosage: e.target.value,
                    })
                  }
                  placeholder="e.g., 10mg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newMedication.frequency}
                  onChange={(e) =>
                    setNewMedication({
                      ...newMedication,
                      frequency: e.target.value,
                    })
                  }
                  placeholder="e.g., Once daily"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prescribed By
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newMedication.prescribedBy}
                  onChange={(e) =>
                    setNewMedication({
                      ...newMedication,
                      prescribedBy: e.target.value,
                    })
                  }
                  placeholder="e.g., Dr. Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newMedication.startDate}
                  onChange={(e) =>
                    setNewMedication({
                      ...newMedication,
                      startDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={addMedication}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Add Medication
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {medications.map((medication) => (
            <div
              key={medication.id}
              className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {medication.name}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Dosage:</strong> {medication.dosage} |{" "}
                    <strong>Frequency:</strong> {medication.frequency}
                  </p>
                  {medication.prescribedBy && (
                    <p className="text-sm text-gray-600">
                      <strong>Prescribed by:</strong> {medication.prescribedBy}
                    </p>
                  )}
                  {medication.startDate && (
                    <p className="text-sm text-gray-600">
                      <strong>Started:</strong> {medication.startDate}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => deleteMedication(medication.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {medications.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>
              No medications recorded yet. Add your first medication to get
              started.
            </p>
          </div>
        )}
      </div>
    );
  };

  const EmergencyContactsTab = () => {
    const [contacts, setContacts] = useState(currentUser.emergencyContacts);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newContact, setNewContact] = useState({
      name: "",
      relationship: "",
      phone: "",
      email: "",
    });

    const addContact = () => {
      const contact = {
        id: Date.now(),
        ...newContact,
      };
      const updatedContacts = [...contacts, contact];
      setContacts(updatedContacts);
      updateUserData("emergencyContacts", updatedContacts);
      setNewContact({ name: "", relationship: "", phone: "", email: "" });
      setShowAddForm(false);
    };

    const deleteContact = (id) => {
      const updatedContacts = contacts.filter((c) => c.id !== id);
      setContacts(updatedContacts);
      updateUserData("emergencyContacts", updatedContacts);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Emergency Contacts</h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <h4 className="text-md font-semibold mb-4">
              Add Emergency Contact
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newContact.name}
                  onChange={(e) =>
                    setNewContact({ ...newContact, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Relationship
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newContact.relationship}
                  onChange={(e) =>
                    setNewContact({
                      ...newContact,
                      relationship: e.target.value,
                    })
                  }
                  placeholder="e.g., Spouse, Parent, Friend"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newContact.phone}
                  onChange={(e) =>
                    setNewContact({ ...newContact, phone: e.target.value })
                  }
                  placeholder="+1-555-0123"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newContact.email}
                  onChange={(e) =>
                    setNewContact({ ...newContact, email: e.target.value })
                  }
                  placeholder="contact@email.com"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={addContact}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Add Contact
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-900">
                      {contact.name}
                    </h4>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      {contact.relationship}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600 flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {contact.phone}
                    </p>
                    {contact.email && (
                      <p className="text-sm text-gray-600 flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        {contact.email}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => deleteContact(contact.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {contacts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Phone className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>
              No emergency contacts yet. Add your first contact to get started.
            </p>
          </div>
        )}
      </div>
    );
  };

  if (!currentUser) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">MedAlert</h1>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {currentUser.profile.firstName || currentUser.username}
              </span>
              <button
                onClick={() => setCurrentUser(null)}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64">
            <nav className="bg-white rounded-lg shadow p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab("dashboard")}
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                      activeTab === "dashboard"
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Shield className="h-4 w-4 mr-3" />
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                      activeTab === "profile"
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <User className="h-4 w-4 mr-3" />
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("medical")}
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                      activeTab === "medical"
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <FileText className="h-4 w-4 mr-3" />
                    Medical History
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("medications")}
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                      activeTab === "medications"
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Heart className="h-4 w-4 mr-3" />
                    Medications
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("contacts")}
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                      activeTab === "contacts"
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Phone className="h-4 w-4 mr-3" />
                    Emergency Contacts
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "medical" && <MedicalHistoryTab />}
            {activeTab === "medications" && <MedicationsTab />}
            {activeTab === "contacts" && <EmergencyContactsTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedAlert;
