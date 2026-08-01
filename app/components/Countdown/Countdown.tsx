import { useState, useEffect } from 'react';

type CountdownProps = {
    className?: string,
    targetDate: Date,
}

type timeLeft = {
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
    done: boolean,
}

function useCountdown(targetDate: Date) {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());



    function calculateTimeLeft() {
        const diff = new Date(targetDate).getTime() - new Date().getTime();
        if (diff <= 0) {return {days: 0, hours: 0, minutes: 0, seconds: 0, done: true}}

        return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        done: false,
        };
    }
    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    return timeLeft;
}

export default function Countdown({className, targetDate} : CountdownProps) {
    const [mounted, setMounted] = useState(false);
    const { days, hours, minutes, seconds, done } = useCountdown(targetDate);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;


    if (done) {
        return <div>REKA HAR BEGYNT!</div>
    }
    return <div>{`${days}:${hours}:${minutes}:${seconds}`}</div>
}