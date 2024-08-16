import React, { useState, useEffect } from 'react'
import './BubbleSort.css'

function BubbleSort() {
    const [array, setArray] = useState([]);
    const [isSorting, setIsSorting] = useState(false);
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        generateRandomArray();
    }, []);

    const generateRandomArray = () => {
        const arr = Array.from({ length: 10}, () => Math.floor(Math.random() * 100));
        setArray(arr);
        setSteps([]);
        setCurrentStep(0);
    };

    const bubbleSort = () => {
        let arr = [...array];
        let steps = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j+1]) {
                    [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                    steps.push([...arr]);
                }
            }
        }
        setSteps(steps);
        setIsSorting(true);
    };

    useEffect(() => {
        if (isSorting && currentStep < steps.length) {
            const timer = setTimeout(() => {
                setArray(steps[currentStep]);
                setCurrentStep(currentStep+1);
            }, 500);
            return () => clearTimeout(timer);
        }
        else if (currentStep >= steps.length) {
            setIsSorting(false);
        }
    }, [isSorting, currentStep, steps]);

    return (
        <div className="bubble-sort-container">
            <h2>Bubble Sort Visualization</h2>
            <div className="array-container">
                {array.map((value, index) => (
                    <div className="array-bar" key={index} style={{ height: `${value}px`}}></div>
                ))}
            </div>
            <button onClick={generateRandomArray} disable={isSorting}>
                Generate New Array
            </button>
            <button onClick={bubbleSort} disable={isSorting}>
                Start Bubble Sort
            </button>
        </div>
    )
}

export default BubbleSort;