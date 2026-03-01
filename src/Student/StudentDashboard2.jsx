import React, { useState, useEffect } from 'react';
import { 
  User, BookOpen, ClipboardList, LayoutDashboard, 
  Plus, Trash2, Save, GraduationCap, CheckCircle, XCircle, BookMarked
} from 'lucide-react';

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function StudentDashboard2() {
  const [activeTab, setActiveTab] = useState('profile');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const [studentInfo, setStudentInfo] = useState({ name: '', id: '', mobile: '' });
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({ code: '', name: '' });
  const [attendance, setAttendance] = useState([]);
  const [attendanceForm, setAttendanceForm] = useState({
    month: 'January',
    subjectCode: '',
    totalLectures: 0,
    presentLectures: 0
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem('studentDashboardData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setStudentInfo(parsed.studentInfo || { name: '', id: '', mobile: '' });
      setSubjects(parsed.subjects || []);
      setAttendance(parsed.attendance || []);
    }
  }, []);

  useEffect(() => {
    const data = { studentInfo, subjects, attendance };
    localStorage.setItem('studentDashboardData', JSON.stringify(data));
  }, [studentInfo, subjects, attendance]);

  const saveProfile = (e) => {
    e.preventDefault();
    setStudentInfo({...studentInfo, savedAt: new Date().toISOString()});
    alert('✅ Profile Saved Successfully!');
  };

  const addSubject = (e) => {
    e.preventDefault();
    if (newSubject.code && newSubject.name) {
      const exists = subjects.find(s => s.code === newSubject.code);
      if (!exists) {
        setSubjects([...subjects, newSubject]);
        setNewSubject({ code: '', name: '' });
        alert('✅ Subject Added!');
      } else {
        alert('⚠️ Subject Code already exists!');
      }
    } else {
      alert('⚠️ Please fill both fields!');
    }
  };

  const deleteSubject = (code) => {
    setSubjects(subjects.filter(s => s.code !== code));
    setAttendance(attendance.filter(a => a.subjectCode !== code));
  };

  const saveAttendance = (e) => {
    e.preventDefault();
    if (!attendanceForm.subjectCode) {
      alert('⚠️ Please select a subject!');
      return;
    }
    if (attendanceForm.presentLectures > attendanceForm.totalLectures) {
      alert('⚠️ Present lectures cannot be more than total!');
      return;
    }

    const existingIndex = attendance.findIndex(
      a => a.month === attendanceForm.month && a.subjectCode === attendanceForm.subjectCode
    );

    const newEntry = {
      ...attendanceForm,
      totalLectures: parseInt(attendanceForm.totalLectures),
      presentLectures: parseInt(attendanceForm.presentLectures),
      savedAt: new Date().toLocaleString()
    };

    if (existingIndex >= 0) {
      const updated = [...attendance];
      updated[existingIndex] = newEntry;
      setAttendance(updated);
    } else {
      setAttendance([...attendance, newEntry]);
    }
    alert('✅ Attendance Saved!');
  };

  const getSubjectStats = (subjectCode) => {
    const subAttendance = attendance.filter(a => a.subjectCode === subjectCode);
    let total = 0, present = 0;
    subAttendance.forEach(a => {
      total += a.totalLectures;
      present += a.presentLectures;
    });
    return { total, present, percentage: total > 0 ? ((present / total) * 100).toFixed(1) : 0 };
  };

  const getOverallStats = () => {
    let total = 0, present = 0;
    attendance.forEach(a => {
      total += a.totalLectures;
      present += a.presentLectures;
    });
    const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
    return { total, present, percentage };
  };

  const stats = getOverallStats();

  const cardStyle = {
    transform: `perspective(1000px) rotateY(${mousePosition.x * 3}deg) rotateX(${-mousePosition.y * 3}deg)`,
    transition: 'transform 0.3s ease-out',
  };

  const tabItems = [
    { id: 'profile', icon: User, label: '👤 Student Profile', color: 'from-cyan-500 to-blue-500' },
    { id: 'subjects', icon: BookOpen, label: '📚 Subjects', color: 'from-pink-500 to-rose-500' },
    { id: 'attendance', icon: ClipboardList, label: '📝 Mark Attendance', color: 'from-purple-500 to-indigo-500' },
    { id: 'dashboard', icon: LayoutDashboard, label: '📊 Dashboard', color: 'from-green-500 to-emerald-500' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating Student Icons */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center animate-float backdrop-blur-sm">
          <GraduationCap className="w-8 h-8 text-cyan-400" />
        </div>
        <div className="absolute top-40 right-32 w-12 h-12 bg-pink-500/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }}>
          <BookOpen className="w-6 h-6 text-pink-400 mx-auto mt-3" />
        </div>
        <div className="absolute bottom-32 left-1/4 w-14 h-14 bg-purple-500/20 rounded-xl animate-float" style={{ animationDelay: '1s' }}>
          <BookMarked className="w-7 h-7 text-purple-400 mx-auto mt-3" />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white shadow-2xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm animate-pulse">
                <GraduationCap className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Student Dashboard</h1>
                <p className="text-cyan-200 text-sm">Attendance Management System</p>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                <p className="font-semibold">🎓 StayBaba Student</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Sidebar Navigation */}
          <aside className="lg:w-64">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              <nav className="p-2">
                {tabItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 mb-2 group ${
                      activeTab === item.id 
                        ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white shadow-lg transform hover:scale-105' 
                        : 'text-gray-300 hover:bg-white/10 hover:translate-x-2'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${activeTab === item.id ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'} transition-all`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            
            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 transform hover:scale-[1.01] transition-transform duration-300" style={cardStyle}>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  Student Profile
                </h2>
                
                <form onSubmit={saveProfile} className="space-y-5 max-w-xl">
                  <div className="relative group">
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Student Name</label>
                    <input
                      type="text"
                      value={studentInfo.name}
                      onChange={e => setStudentInfo({...studentInfo, name: e.target.value})}
                      className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="relative group">
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Student ID</label>
                    <input
                      type="text"
                      value={studentInfo.id}
                      onChange={e => setStudentInfo({...studentInfo, id: e.target.value})}
                      className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300"
                      placeholder="Enter your student ID"
                    />
                  </div>
                  
                  <div className="relative group">
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Mobile Number</label>
                    <input
                      type="tel"
                      value={studentInfo.mobile}
                      onChange={e => setStudentInfo({...studentInfo, mobile: e.target.value})}
                      className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300"
                      placeholder="Enter mobile number"
                    />
                  </div>
                  
                  <button type="submit" className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 flex items-center gap-2 transition-all duration-300 shadow-lg shadow-purple-500/30 transform hover:scale-105 hover:shadow-xl">
                    <Save className="w-5 h-5" /> Save Profile
                  </button>
                </form>
              </div>
            )}

            {/* SUBJECTS TAB */}
            {activeTab === 'subjects' && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6" style={cardStyle}>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  Subject Management
                </h2>
                
                {/* Add Subject Form */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 p-5 rounded-2xl mb-8 border border-white/10">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-cyan-400" /> Add New Subject
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={newSubject.code}
                      onChange={e => setNewSubject({...newSubject, code: e.target.value.toUpperCase()})}
                      placeholder="Subject Code (e.g., CS101)"
                      className="px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 transition-all"
                    />
                    <input
                      type="text"
                      value={newSubject.name}
                      onChange={e => setNewSubject({...newSubject, name: e.target.value})}
                      placeholder="Subject Name (e.g., Data Structures)"
                      className="px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 transition-all"
                    />
                  </div>
                  <button 
                    onClick={addSubject}
                    className="mt-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-xl hover:from-pink-400 hover:to-rose-400 flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
                  >
                    <Plus className="w-5 h-5" /> Add Subject
                  </button>
                </div>

                <h3 className="font-semibold text-white mb-4">Your Subjects ({subjects.length})</h3>
                
                {subjects.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p>No subjects added yet. Add your first subject above!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {subjects.map(sub => {
                      const subStats = getSubjectStats(sub.code);
                      return (
                        <div key={sub.code} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300 transform hover:-translate-y-2 group">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                {sub.code}
                              </span>
                            </div>
                            <button 
                              onClick={() => deleteSubject(sub.code)}
                              className="text-red-400 hover:text-red-600 p-1 opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                          <h4 className="font-bold text-white text-lg mb-2">{sub.name}</h4>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Attendance: {subStats.percentage}%</span>
                            <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${subStats.percentage >= 75 ? 'bg-green-500' : subStats.percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                style={{ width: `${subStats.percentage}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ATTENDANCE TAB */}
            {activeTab === 'attendance' && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6" style={cardStyle}>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl">
                    <ClipboardList className="w-6 h-6 text-white" />
                  </div>
                  Mark Monthly Attendance
                </h2>
                
                {subjects.length === 0 ? (
                  <div className="bg-yellow-500/20 border border-yellow-500/50 p-6 rounded-2xl text-center">
                    <p className="text-yellow-400 font-semibold">⚠️ No Subjects Found!</p>
                    <p className="text-yellow-300">Please add subjects first in the Subjects tab.</p>
                  </div>
                ) : (
                  <form onSubmit={saveAttendance} className="space-y-5 max-w-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Select Month</label>
                        <select
                          value={attendanceForm.month}
                          onChange={e => setAttendanceForm({...attendanceForm, month: e.target.value})}
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all [&>option]:text-black"
                        >
                          {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Select Subject</label>
                        <select
                          value={attendanceForm.subjectCode}
                          onChange={e => setAttendanceForm({...attendanceForm, subjectCode: e.target.value})}
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all [&>option]:text-black"
                        >
                          <option value="">-- Choose Subject --</option>
                          {subjects.map(s => (
                            <option key={s.code} value={s.code}>{s.code} - {s.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Total Lectures</label>
                        <input
                          type="number"
                          value={attendanceForm.totalLectures}
                          onChange={e => setAttendanceForm({...attendanceForm, totalLectures: e.target.value})}
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all"
                          placeholder="Total lectures"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Present Lectures</label>
                        <input
                          type="number"
                          value={attendanceForm.presentLectures}
                          onChange={e => setAttendanceForm({...attendanceForm, presentLectures: e.target.value})}
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all"
                          placeholder="Present lectures"
                        />
                      </div>
                    </div>

                    <button type="submit" className="bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 text-white px-8 py-4 rounded-xl hover:from-purple-400 hover:via-indigo-400 hover:to-pink-400 flex items-center gap-2 transition-all duration-300 shadow-lg shadow-purple-500/30 transform hover:scale-105">
                      <Save className="w-5 h-5" /> Save Attendance
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* DASHBOARD TAB */}
            {activeTab === 'dashboard' && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6" style={cardStyle}>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                    <LayoutDashboard className="w-6 h-6 text-white" />
                  </div>
                  Attendance Dashboard
                </h2>
                
                {subjects.length === 0 ? (
                  <div className="bg-yellow-500/20 border border-yellow-500/50 p-6 rounded-2xl text-center">
                    <p className="text-yellow-400 font-semibold">⚠️ No Subjects Found!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl border border-white/10">
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        <span className="text-white font-semibold">Overall: {stats.percentage}%</span>
                      </div>
                      <div className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl border border-white/10">
                        <XCircle className="w-6 h-6 text-red-400" />
                        <span className="text-white font-semibold">Total: {stats.total}</span>
                      </div>
                      <div className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl border border-white/10">
                        <User className="w-6 h-6 text-cyan-400" />
                        <span className="text-white font-semibold">Present: {stats.present}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {subjects.map(sub => {
                        const subStats = getSubjectStats(sub.code);
                        return (
                          <div key={sub.code} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 transform hover:-translate-y-2">
                            <h4 className="font-bold text-white text-lg mb-2">{sub.code} - {sub.name}</h4>
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-gray-400">Attendance: {subStats.percentage}%</span>
                              <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${subStats.percentage >= 75 ? 'bg-green-500' : subStats.percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                  style={{ width: `${subStats.percentage}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

          </main>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default StudentDashboard2;
