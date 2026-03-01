import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Calendar, Clock, User, MapPin, Phone, Mail, BookOpen,
    FlaskConical, CalendarDays, Music, ChevronRight,
    CheckCircle, X, Plus, Minus, Search, Filter,
    Sparkles, Zap, ArrowLeft, ArrowRight, Star,
    CreditCard, Building, GraduationCap, QrCode, Smartphone
} from 'lucide-react';

const BOOKING_TYPES = [
    {
        id: 'tutor',
        icon: GraduationCap,
        label: 'Tutor Session',
        color: 'from-blue-500 to-cyan-500',
        shadow: 'hover:shadow-blue-500/30',
        description: 'Book 1-on-1 tutoring sessions'
    },
    {
        id: 'library',
        icon: BookOpen,
        label: 'Library Seat',
        color: 'from-green-500 to-emerald-500',
        shadow: 'hover:shadow-green-500/30',
        description: 'Reserve your study spot'
    },
    {
        id: 'lab',
        icon: FlaskConical,
        label: 'Lab Booking',
        color: 'from-purple-500 to-pink-500',
        shadow: 'hover:shadow-purple-500/30',
        description: 'Book computer/science lab'
    },
    {
        id: 'event',
        icon: CalendarDays,
        label: 'Event',
        color: 'from-orange-500 to-red-500',
        shadow: 'hover:shadow-orange-500/30',
        description: 'Workshops, seminars & more'
    },
];

const TUTORS = [
    { id: 1, name: 'Dr. Sarah Johnson', subject: 'Mathematics', rating: 4.9, experience: '8 years', available: true, price: 500 },
    { id: 2, name: 'Prof. Michael Chen', subject: 'Physics', rating: 4.8, experience: '10 years', available: true, price: 450 },
    { id: 3, name: 'Ms. Emily Davis', subject: 'Chemistry', rating: 4.7, experience: '5 years', available: true, price: 400 },
    { id: 4, name: 'Mr. Robert Wilson', subject: 'Computer Science', rating: 4.9, experience: '12 years', available: true, price: 550 },
];

const LIBRARY_SLOTS = [
    { id: 1, name: 'Central Library - Floor 1', seats: 50, available: 12, timing: '8:00 AM - 10:00 PM' },
    { id: 2, name: 'Science Library', seats: 30, available: 8, timing: '9:00 AM - 8:00 PM' },
    { id: 3, name: 'Digital Library', seats: 25, available: 15, timing: '10:00 AM - 6:00 PM' },
];

const LAB_SLOTS = [
    { id: 1, name: 'Computer Lab - A101', computers: 40, available: 15, timing: '9:00 AM - 5:00 PM' },
    { id: 2, name: 'Physics Lab', computers: 20, available: 8, timing: '10:00 AM - 4:00 PM' },
    { id: 3, name: 'Chemistry Lab', computers: 15, available: 5, timing: '9:00 AM - 3:00 PM' },
];

const TIME_SLOTS = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

const EVENTS = [
    { id: 1, name: 'Tech Workshop: AI Basics', date: '2024-02-15', seats: 30, available: 12, type: 'Workshop' },
    { id: 2, name: 'Career Guidance Seminar', date: '2024-02-18', seats: 100, available: 45, type: 'Seminar' },
    { id: 3, name: 'Coding Competition', date: '2024-02-20', seats: 50, available: 20, type: 'Competition' },
];

const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {[...Array(50)].map((_, i) => (
            <div
                key={i}
                className="absolute animate-confetti"
                style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                    backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'][Math.floor(Math.random() * 5)]
                }}
            >
                <div className="w-3 h-3 rounded-sm rotate-45" />
            </div>
        ))}
    </div>
);

function Bookings({ user }) {
    const navigate = useNavigate();
    const [activeType, setActiveType] = useState('tutor');
    const [step, setStep] = useState(1);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [animateKey, setAnimateKey] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const [formData, setFormData] = useState({
        studentName: '', studentId: '', email: '', phone: '',
        date: '', subject: '', notes: '', quantity: 1
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

    const cardStyle = {
        transform: `perspective(1000px) rotateY(${mousePosition.x * 3}deg) rotateX(${-mousePosition.y * 3}deg)`,
        transition: 'transform 0.3s ease-out',
    };

    const animateTransition = (callback) => {
        setAnimateKey(prev => prev + 1);
        setTimeout(callback, 150);
    };

    const handleTypeChange = (type) => {
        if (type !== activeType) {
            animateTransition(() => {
                setActiveType(type);
                setStep(1);
                setSelectedItem(null);
                setSelectedTime('');
            });
        }
    };

    const getData = () => {
        switch (activeType) {
            case 'tutor': return TUTORS;
            case 'library': return LIBRARY_SLOTS;
            case 'lab': return LAB_SLOTS;
            case 'event': return EVENTS;
            default: return [];
        }
    };

    const handleNext = () => {
        if (step === 1 && !selectedItem) {
            alert('Please select an option first!');
            return;
        }
        if (step === 2 && (!formData.date || !selectedTime)) {
            alert('Please select date and time!');
            return;
        }
        if (step === 2 && (!formData.studentName || !formData.email)) {
            alert('Please fill in your details!');
            return;
        }
        if (step < 4) {
            animateTransition(() => setStep(step + 1));
        } else {
            setShowConfirmation(true);
        }
    };

    const handlePrev = () => {
        if (step > 1) {
            animateTransition(() => setStep(step - 1));
        }
    };

    const resetBooking = () => {
        setStep(1);
        setSelectedItem(null);
        setSelectedTime('');
        setFormData({ studentName: '', studentId: '', email: '', phone: '', date: '', subject: '', notes: '', quantity: 1 });
        setShowConfirmation(false);
    };

    const getPrice = () => {
        if (!selectedItem) return 0;
        if (activeType === 'tutor') return selectedItem.price * formData.quantity;
        if (activeType === 'event') return 0;
        return 0;
    };

    const currentType = BOOKING_TYPES.find(t => t.id === activeType);

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
                
                <div className="absolute top-20 left-20 w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center animate-float backdrop-blur-sm">
                    <GraduationCap className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="absolute top-40 right-32 w-12 h-12 bg-pink-500/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }}>
                    <BookOpen className="w-6 h-6 text-pink-400 mx-auto mt-3" />
                </div>
            </div>

            {showConfirmation && <Confetti />}

            <header className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/10 sticky top-0">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center animate-pulse">
                                <GraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">StudentBook</h1>
                                <p className="text-xs text-white/60">Campus Booking System</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <div className="flex items-center justify-center gap-2 md:gap-4">
                        {[1, 2, 3, 4].map((s, index) => (
                            <React.Fragment key={s}>
                                <div className={`flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 rounded-full transition-all duration-500 ${step >= s ? 'bg-purple-500 text-white scale-110' : 'bg-white/10 text-white/50'}`}>
                                    <div className={`w-6 md:w-8 h-6 md:h-8 rounded-full flex items-center justify-center font-bold ${step > s ? 'bg-white/20' : 'bg-white/10'}`}>
                                        {step > s ? <CheckCircle className="w-4 md:w-5 h-4 md:h-5" /> : s}
                                    </div>
                                    <span className="hidden md:inline font-medium text-sm">
                                        {s === 1 ? 'Select' : s === 2 ? 'Schedule' : s === 3 ? 'Confirm' : 'Pay'}
                                    </span>
                                </div>
                                {index < 3 && <div className={`w-8 md:w-16 h-0.5 transition-all duration-500 ${step > s ? 'bg-purple-500' : 'bg-white/20'}`} />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" key={animateKey}>
                        <h2 className="text-white text-xl font-semibold mb-6 text-center">What would you like to book?</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {BOOKING_TYPES.map((type, index) => (
                                <button key={type.id} onClick={() => handleTypeChange(type.id)} className={`p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:-translate-y-1 group ${activeType === type.id ? 'border-transparent shadow-lg' : ''}`} style={{ animationDelay: `${index * 100}ms` }}>
                                    <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${type.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <type.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="font-bold text-white mb-1 text-center">{type.label}</h3>
                                    <p className="text-white/60 text-xs text-center">{type.description}</p>
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {getData().map((item, index) => (
                                <button key={item.id} onClick={() => { setSelectedItem(item); animateTransition(() => setStep(2)); }} className={`p-6 bg-white/10 backdrop-blur-sm rounded-2xl text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl animate-in fade-in slide-in-from-bottom-4 ${selectedItem?.id === item.id ? 'ring-4 ring-purple-500 shadow-purple-500/30' : ''}`} style={{ animationDelay: `${index * 100}ms` }}>
                                    {activeType === 'tutor' && (
                                        <>
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                                                    <User className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="flex items-center gap-1 text-yellow-500">
                                                    <Star className="w-4 h-4 fill-current" />
                                                    <span className="text-sm font-bold">{item.rating}</span>
                                                </div>
                                            </div>
                                            <h4 className="font-bold text-white text-lg">{item.name}</h4>
                                            <p className="text-cyan-400 font-medium">{item.subject}</p>
                                            <p className="text-white/60 text-sm mt-1">{item.experience} experience</p>
                                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/20">
                                                <span className="text-2xl font-bold text-white">₹{item.price}<span className="text-sm text-white/50 font-normal">/session</span></span>
                                                {item.available && <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-medium">Available</span>}
                                            </div>
                                        </>
                                    )}

                                    {activeType === 'library' && (
                                        <>
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                                                    <BookOpen className="w-6 h-6 text-white" />
                                                </div>
                                                <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-medium">{item.available} seats left</span>
                                            </div>
                                            <h4 className="font-bold text-white text-lg">{item.name}</h4>
                                            <p className="text-white/60 text-sm flex items-center gap-1 mt-2"><MapPin className="w-4 h-4" /> Campus Building</p>
                                            <div className="flex items-center gap-1 mt-2 text-white/60 text-sm">
                                                <Clock className="w-4 h-4" /> {item.timing}
                                            </div>
                                            <div className="mt-4 pt-3 border-t border-white/20">
                                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                                    <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: `${(item.available / item.seats) * 100}%` }} />
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {activeType === 'lab' && (
                                        <>
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                                    <FlaskConical className="w-6 h-6 text-white" />
                                                </div>
                                                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full font-medium">{item.available} PCs left</span>
                                            </div>
                                            <h4 className="font-bold text-white text-lg">{item.name}</h4>
                                            <p className="text-white/60 text-sm flex items-center gap-1 mt-2"><MapPin className="w-4 h-4" /> Campus Building</p>
                                            <div className="flex items-center gap-1 mt-2 text-white/60 text-sm">
                                                <Clock className="w-4 h-4" /> {item.timing}
                                            </div>
                                            <div className="mt-4 pt-3 border-t border-white/20">
                                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${(item.available / item.computers) * 100}%` }} />
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {activeType === 'event' && (
                                        <>
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                                                    <CalendarDays className="w-6 h-6 text-white" />
                                                </div>
                                                <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs rounded-full font-medium">{item.available} seats left</span>
                                            </div>
                                            <h4 className="font-bold text-white text-lg">{item.name}</h4>
                                            <p className="text-white/60 text-sm flex items-center gap-1 mt-2"><Calendar className="w-4 h-4" /> {item.date}</p>
                                            <div className="mt-4 pt-3 border-t border-white/20">
                                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                                    <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full" style={{ width: `${(item.available / item.seats) * 100}%` }} />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" key={animateKey} style={cardStyle}>
                        <h2 className="text-white text-xl font-semibold mb-6 text-center">Schedule Your {currentType.label}</h2>
                        <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <div className="mb-4">
                                <label className="block text-white font-medium mb-2">Your Name</label>
                                <input type="text" className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40" placeholder="Enter your name" value={formData.studentName} onChange={(e) => setFormData({ ...formData, studentName: e.target.value })} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white font-medium mb-2">Email</label>
                                <input type="email" className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40" placeholder="Enter your email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white font-medium mb-2">Select Date</label>
                                <input type="date" className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white font-medium mb-2">Select Time</label>
                                <select className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white [&>option]:text-black" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                                    <option value="">Select a time slot</option>
                                    {TIME_SLOTS.map((time) => (<option key={time} value={time}>{time}</option>))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-white font-medium mb-2">Additional Notes</label>
                                <textarea className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40" rows="3" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-6">
                            <button onClick={handlePrev} className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors">Back</button>
                            <button onClick={handleNext} className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-colors transform hover:scale-105">Continue</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" key={animateKey} style={cardStyle}>
                        <h2 className="text-white text-xl font-semibold mb-6 text-center">Confirm Your Booking</h2>
                        <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <h3 className="text-white font-bold text-lg mb-4">{currentType.label} Details</h3>
                            <p className="text-white/80 mb-2"><span className="font-medium">Student Name:</span> {formData.studentName}</p>
                            <p className="text-white/80 mb-2"><span className="font-medium">Email:</span> {formData.email}</p>
                            <p className="text-white/80 mb-2"><span className="font-medium">Name:</span> {selectedItem?.name}</p>
                            {activeType === 'tutor' && <p className="text-white/80 mb-2"><span className="font-medium">Subject:</span> {selectedItem?.subject}</p>}
                            <p className="text-white/80 mb-2"><span className="font-medium">Date:</span> {formData.date}</p>
                            <p className="text-white/80 mb-2"><span className="font-medium">Time:</span> {selectedTime}</p>
                            <p className="text-white font-bold text-lg mt-4">Total Price: ₹{getPrice()}</p>
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-6">
                            <button onClick={handlePrev} className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors">Back</button>
                            <button onClick={handleNext} className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-colors transform hover:scale-105">
                                {getPrice() === 0 ? 'Confirm Booking' : 'Proceed to Payment'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float { animation: float 6s ease-in-out infinite; }
                @keyframes confetti {
                    0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                }
                .animate-confetti { animation: confetti 3s ease-out forwards; }
            `}</style>
        </div>
    );
}

export default Bookings;
