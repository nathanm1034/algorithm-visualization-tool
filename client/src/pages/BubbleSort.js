import React, { useState, useEffect } from 'react'
import './BubbleSort.css'

function BubbleSort() {
    const [array, setArray] = useState([]);
    const [isSorting, setIsSorting] = useState(false);
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [optimized, setOptimized] = useState(false);
    const [descending, setDescending] = useState(false);
    const [pendingArraySize, setPendingArraySize] = useState(10);
    const [arraySize, setArraySize] = useState(10);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        generateRandomArray();
    }, []);

    const generateRandomArray = () => {
        setArraySize(pendingArraySize)
        const arr = Array.from({ length: pendingArraySize }, () => Math.floor(Math.random() * 100));
        setArray(arr);
        setSteps([]);
        setCurrentStep(0);
    };

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        if (index !== hoveredIndex) {
            setHoveredIndex(index);
            const newArray = [...array];
            const [movedItem] = newArray.splice(draggedIndex, 1);
            newArray.splice(index, 0, movedItem);
            setArray(newArray);
            setDraggedIndex(index);
        }
    };

    const handleDrop = () => {
        setDraggedIndex(null);
        setHoveredIndex(null);
    };

    const bubbleSort = () => {
        let arr = [...array];
        let steps = [];
        let swapped;

        for (let i = 0; i < arr.length; i++) {
            swapped = false;
            for (let j = 0; j < arr.length - i - 1; j++) {
                if ((!descending && arr[j] > arr[j+1]) || (descending && arr[j] < arr[j+1])) {
                    [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                    steps.push([...arr]);
                    swapped = true;
                }
            }

            if (optimized && !swapped) break;
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
                    <div 
                        className="array-bar-wrapper" 
                        key={index} 
                        draggable 
                        onDragStart={() => handleDragStart(index)} 
                        onDragOver={(e) => handleDragOver(e, index)} 
                        onDrop={handleDrop}
                    >
                        <div 
                            className="array-bar" 
                            style={{ height: `${value}px`}}
                        ></div>
                    </div>
                ))}
            </div>
            <label>
                <input 
                    type="checkbox" 
                    checked={optimized} 
                    onChange={() => setOptimized(!optimized)} 
                    disabled={isSorting}
                />
                Enable Optimized Bubble Sort
            </label>
            <label>
                <input 
                    type="checkbox" 
                    checked={descending} 
                    onChange={() => setDescending(!descending)} 
                    disabled={isSorting}
                />
                Sort from Greatest to Least
            </label>
            <div>
                <label>
                    Array Size: 
                    <select 
                        value={pendingArraySize} 
                        onChange={(e) => setPendingArraySize(Number(e.target.value))} 
                        disabled={isSorting}
                        >
                        {Array.from({ length: 21}, (_, i) => i + 5).map(size => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <button onClick={generateRandomArray} disabled={isSorting}>
                Generate New Array
            </button>
            <button onClick={bubbleSort} disabled={isSorting}>
                Start Bubble Sort
            </button>
        </div>
    )
}

export default BubbleSort;