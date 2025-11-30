import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
    // State untuk menyimpan sisa waktu
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        if (!targetDate) return;

        const calculateTimeLeft = () => {
            const difference = new Date(targetDate) - new Date();
            let timeLeft = {};

            if (difference > 0) {
                timeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            } else {
                timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }
            return timeLeft;
        };

        // Hitung waktu segera setelah komponen dimuat
        setTimeLeft(calculateTimeLeft());

        // Atur interval untuk update setiap detik
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Bersihkan interval saat komponen dilepas
        return () => clearInterval(timer);
    }, [targetDate]);

    if (timeLeft === null) {
        return <div className="text-center font-mono text-slate-500 text-sm">Loading countdown...</div>;
    }
    
    const { days, hours, minutes, seconds } = timeLeft;
    
    // Format output
    const timerComponents = [
        { label: "Hari", value: days },
        { label: "Jam", value: hours },
        { label: "Menit", value: minutes },
        { label: "Detik", value: seconds }
    ];

    const isFinished = days === 0 && hours === 0 && minutes === 0 && seconds === 0;

    return (
        <div className="text-center font-mono text-amber-400 text-xl font-bold tracking-widest flex justify-center gap-3 md:gap-4">
            {isFinished ? (
                <span className="text-red-400">PEMILIHAN TELAH BERAKHIR!</span>
            ) : (
                timerComponents.map((comp, index) => (
                    <div key={comp.label} className="flex flex-col items-center">
                        <span className="text-3xl md:text-4xl leading-none">
                            {String(comp.value).padStart(2, '0')}
                        </span>
                        <span className="text-xs text-slate-400 mt-1 uppercase">
                            {comp.label}
                        </span>
                    </div>
                ))
            )}
        </div>
    );
};

export default CountdownTimer;