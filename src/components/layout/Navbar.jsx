// import React, { useState, useRef, useEffect } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// // 💎 NEW: Import Menu and X icons for the hamburger
// import { FiGrid, FiPackage, FiBookOpen, FiUsers, FiUserCheck, FiBarChart2, FiUser, FiLogOut, FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
// import { toast } from 'react-toastify';

// // Helper function for avatar initials (from your code)
// const getInitials = (name) => {
//     if (!name) return 'U';
//     const names = name.split(' ');
//     if (names.length === 1) return names[0].charAt(0).toUpperCase();
//     return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
// };

// const Navbar = ({ businessName, userName, userEmail, avatar }) => {
//     const navigate = useNavigate();
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const dropdownRef = useRef(null);

//     // Close dropdown when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setDropdownOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, [dropdownRef]);


//     const handleLogout = () => {
//         setDropdownOpen(false);
//         toast.info("Logging you out...");
//         // Replace with your actual logout logic (e.g., using useAuth hook)
//         setTimeout(() => navigate('/login'), 1500);
//     };

//     const navItems = [
//         { to: "/dashboard", icon: <FiGrid />, label: "Dashboard" },
//         { to: "/inventory", icon: <FiPackage />, label: "Inventory" },
//         { to: "/ledger", icon: <FiBookOpen />, label: "Ledger" },
//         { to: "/customer", icon: <FiUsers />, label: "Customers" },
//         { to: "/visitor", icon: <FiUserCheck />, label: "Visitors" },
//         { to: "/report", icon: <FiBarChart2 />, label: "Reports" },
//     ];

//     const activeLinkStyle = {
//         color: '#00529B',
//         backgroundColor: '#E6F4FF'
//     };

//     const placeholderAvatar = `https://placehold.co/40x40/cccccc/333333?text=${getInitials(userName)}`;

//     return (
//         <nav className="bg-white h-full flex flex-col">
//             {/* Business Name Header */}
//             <div className="p-4 border-b border-gray-200">
//                 <h1 className="text-xl font-bold text-slate-800 truncate">{businessName || 'My Business'}</h1>
//             </div>

//             {/* Navigation Links */}
//             <div className="flex-1 overflow-y-auto py-4">
//                 <div className="space-y-1 px-2">
//                     {navItems.map(item => (
//                         <NavLink
//                             key={item.label}
//                             to={item.to}
//                             style={({ isActive }) => isActive ? activeLinkStyle : undefined}
//                             className="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
//                         >
//                             {item.icon}
//                             <span>{item.label}</span>
//                         </NavLink>
//                     ))}
//                 </div>
//             </div>

//             {/* User Profile Section */}
//             <div className="p-4 border-t border-gray-200">
//                 <div className="relative" ref={dropdownRef}>
//                     <button
//                         onClick={() => setDropdownOpen(!dropdownOpen)}
//                         className="flex items-center gap-3 w-full text-left focus:outline-none"
//                     >
//                         {avatar ? (
//                             <img
//                                 src={avatar}
//                                 alt="User"
//                                 className="w-9 h-9 rounded-full object-cover"
//                                 onError={(e) => e.target.src = placeholderAvatar}
//                             />
//                         ) : (
//                             <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#003B6F] to-[#007BFF] text-white font-bold flex items-center justify-center text-sm">
//                                 {getInitials(userName)}
//                             </div>
//                         )}
//                         <div className="flex-1 min-w-0">
//                             <p className="text-sm font-medium text-gray-800 truncate">{userName || 'Business Owner'}</p>
//                             <p className="text-xs text-gray-500 truncate">{userEmail || 'user@example.com'}</p>
//                         </div>
//                         <FiChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
//                     </button>

//                     {dropdownOpen && (
//                         <div className="absolute bottom-full left-0 mb-2 w-full bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100 animate-fade-in-up">
//                             <div className="py-1">
//                                 <NavLink to="/profile" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                                     <FiUser className="h-4 w-4" /> My Profile
//                                 </NavLink>
//                             </div>
//                             <div className="border-t border-gray-100 py-1">
//                                 <button onClick={handleLogout} className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
//                                     <FiLogOut className="h-4 w-4" /> Logout
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;




import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiGrid, FiPackage, FiBookOpen, FiUsers, FiUserCheck, FiBarChart2, FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi';
import { toast } from 'react-toastify';
import * as profileService from "../../services/profileService";  // ✅ Import profile service

const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

const Navbar = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // ✅ NEW STATES
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [avatar, setAvatar] = useState('');

    // ✅ FETCH PROFILE DATA
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await profileService.getProfile();
                setUserName(data.fullName);
                setUserEmail(data.email);
                setAvatar(data.avatar);
            } catch (error) {
                console.error("Failed to fetch profile in Navbar", error);
            }
        };

        fetchProfile();
    }, []);

    // Close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken"); // optional logout
        toast.info("Logging you out...");
        setTimeout(() => navigate('/login'), 1500);
    };

    const navItems = [
        { to: "/dashboard", icon: <FiGrid />, label: "Dashboard" },
        { to: "/inventory", icon: <FiPackage />, label: "Inventory" },
        { to: "/ledger", icon: <FiBookOpen />, label: "Ledger" },
        { to: "/customer", icon: <FiUsers />, label: "Customers" },
        { to: "/visitor", icon: <FiUserCheck />, label: "Visitors" },
        { to: "/report", icon: <FiBarChart2 />, label: "Reports" },
    ];

    const activeLinkStyle = {
        color: '#00529B',
        backgroundColor: '#E6F4FF'
    };

    const placeholderAvatar = `https://placehold.co/40x40/cccccc/333333?text=${getInitials(userName)}`;

    return (
        <nav className="bg-white h-full flex flex-col">

            {/* Business Name */}
            <div className="p-4 border-b border-gray-200">
                <h1 className="text-xl font-bold text-slate-800 truncate">
                    SmartDhandha
                </h1>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-1 px-2">
                    {navItems.map(item => (
                        <NavLink
                            key={item.label}
                            to={item.to}
                            style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                            className="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* User Profile */}
            <div className="p-4 border-t border-gray-200">
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-3 w-full text-left"
                    >
                        {avatar ? (
                            <img
                                src={avatar}
                                alt="User"
                                className="w-9 h-9 rounded-full object-cover"
                                onError={(e) => e.target.src = placeholderAvatar}
                            />
                        ) : (
                            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                                {getInitials(userName)}
                            </div>
                        )}

                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">
                                {userName || "User"}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {userEmail || "user@example.com"}
                            </p>
                        </div>

                        <FiChevronDown className="h-4 w-4 text-gray-500" />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute bottom-full left-0 mb-2 w-full bg-white rounded-lg shadow-xl py-2 z-50 border">
                            <NavLink
                                to="/profile"
                                onClick={() => setDropdownOpen(false)}
                                className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100"
                            >
                                <FiUser /> My Profile
                            </NavLink>

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                            >
                                <FiLogOut /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </nav>
    );
};

export default Navbar;
