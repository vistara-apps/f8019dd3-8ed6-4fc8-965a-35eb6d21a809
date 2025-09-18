'use client';

import { useState } from 'react';
import { Plus, Calendar, Clock, DollarSign } from 'lucide-react';

export function StreamIntegrationFrame() {
  const [formData, setFormData] = useState({
    title: '',
    outcomes: ['', ''],
    duration: '2',
    baseReward: '50',
  });

  const addOutcome = () => {
    if (formData.outcomes.length < 5) {
      setFormData(prev => ({
        ...prev,
        outcomes: [...prev.outcomes, '']
      }));
    }
  };

  const updateOutcome = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      outcomes: prev.outcomes.map((outcome, i) => i === index ? value : outcome)
    }));
  };

  const removeOutcome = (index: number) => {
    if (formData.outcomes.length > 2) {
      setFormData(prev => ({
        ...prev,
        outcomes: prev.outcomes.filter((_, i) => i !== index)
      }));
    }
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Plus className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Create Prediction Market</h2>
          <p className="text-sm text-text-secondary">Set up a new market for your stream</p>
        </div>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Market Question
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g., Will I beat this boss on first try?"
            className="input w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Possible Outcomes
          </label>
          <div className="space-y-2">
            {formData.outcomes.map((outcome, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={outcome}
                  onChange={(e) => updateOutcome(index, e.target.value)}
                  placeholder={`Outcome ${index + 1}`}
                  className="input flex-1"
                />
                {formData.outcomes.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOutcome(index)}
                    className="text-red-400 hover:text-red-300 px-2"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            {formData.outcomes.length < 5 && (
              <button
                type="button"
                onClick={addOutcome}
                className="text-primary hover:text-primary/80 text-sm flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add outcome</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              Duration (hours)
            </label>
            <select
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              className="input w-full"
            >
              <option value="0.5">30 minutes</option>
              <option value="1">1 hour</option>
              <option value="2">2 hours</option>
              <option value="4">4 hours</option>
              <option value="8">8 hours</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              <DollarSign className="w-4 h-4 inline mr-1" />
              Base Reward (CBT)
            </label>
            <input
              type="number"
              value={formData.baseReward}
              onChange={(e) => setFormData(prev => ({ ...prev, baseReward: e.target.value }))}
              min="10"
              max="1000"
              className="input w-full"
            />
          </div>
        </div>

        <div className="bg-surface-light rounded-lg p-4">
          <h3 className="font-medium text-text-primary mb-2">Market Preview</h3>
          <div className="text-sm text-text-secondary space-y-1">
            <p><strong>Question:</strong> {formData.title || 'Your market question'}</p>
            <p><strong>Outcomes:</strong> {formData.outcomes.filter(o => o).join(', ') || 'Your outcomes'}</p>
            <p><strong>Duration:</strong> {formData.duration} hours</p>
            <p><strong>Base Reward:</strong> {formData.baseReward} CBT</p>
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary w-full"
          disabled={!formData.title || formData.outcomes.filter(o => o).length < 2}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Create Market
        </button>
      </form>
    </div>
  );
}
