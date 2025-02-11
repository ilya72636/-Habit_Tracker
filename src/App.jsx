import React, { useState, useEffect } from 'react';
import './App.css';
import Progress from './Progress'; // Подключаем компонент

export default function App() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habit-tracker');
    return saved ? JSON.parse(saved) : Array(10).fill(Array(30).fill(false));
  });

  const [habitNames, setHabitNames] = useState(() => {
    const savedNames = localStorage.getItem('habit-names');
    return savedNames ? JSON.parse(savedNames) : [
      'помолится','заправить кровать', 'умытся, зубы', 'кормить арчи', 'изуч програм', 'библия',
      'молива вечер', '', '', '', ''
    ];
  });

  useEffect(() => {
    localStorage.setItem('habit-tracker', JSON.stringify(habits));
    localStorage.setItem('habit-names', JSON.stringify(habitNames));
  }, [habits, habitNames]);

  const toggleCheck = (habitIndex, dayIndex) => {
    setHabits(prev =>
      prev.map((habit, i) =>
        i === habitIndex ? habit.map((done, j) => (j === dayIndex ? !done : done)) : habit
      )
    );
  };

  const handleEditHabit = (index, newName) => {
    setHabitNames(prev => prev.map((name, i) => (i === index ? newName : name)));
  };

  const handleRightClick = (e, habitIndex, dayIndex) => {
    e.preventDefault();
    toggleCheck(habitIndex, dayIndex);
  };

  return (
    <div className="app-container">
      <h1 className="header">📊 Трекер привычек</h1>
      <div className="habit-table-wrapper">
        <table className="habit-table">
          <thead>
            <tr>
              <th>Привычка</th>
              {Array.from({ length: 30 }, (_, i) => (
                <th key={i}>{i + 1}</th>
              ))}
              <th>Прогресс</th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habit, i) => (
              <tr key={i}>
                <td style={{ width: '250px' }}> {/* Добавил стиль для колонки */}
                  <input
                    type="text"
                    value={habitNames[i]}
                    onChange={(e) => handleEditHabit(i, e.target.value)}
                    className="habit-input"
                  />
                </td>

                {habit.map((done, j) => (
                  <td key={j}>
                    <div
                      className={`habit-checkbox ${done ? 'checked' : ''}`}
                      onClick={() => toggleCheck(i, j)}
                      onContextMenu={(e) => handleRightClick(e, i, j)} // Обработка правого клика
                    />
                  </td>
                ))}
                <td>
                  <Progress progress={(habit.filter(Boolean).length / 30) * 100} /> {/* Используем компонент Progress */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
