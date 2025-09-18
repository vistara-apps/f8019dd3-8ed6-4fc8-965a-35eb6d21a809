'use client';

import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

interface CreateMarketModalProps {
  onClose: () => void;
}

export function CreateMarketModal({ onClose }: CreateMarketModalProps) {
  const [title, setTitle] = useState('');
  const [outcomes, setOutcomes] = useState(['', '']);
  const [duration, setDuration] = useState('60');
  const [isCreating, setIsCreating] = useState(false);

  const addOutcome = () => {
    if (outcomes.length < 5) {
      setOutcomes([...outcomes, '']);
    }
  };

  const removeOutcome = (index: number) => {
    if (outcomes.length > 2) {
      setOutcomes(outcomes.filter((_, i) => i !== index));
    }
  };

  const updateOutcome = (index: number, value: string) => {
    const newOutcomes = [...outcomes];
    newOutcomes[index] = value;
    setOutcomes(newOutcomes);
  };

  const handleCreate = async () => {
    if (!title || outcomes.some(o => !o.trim())) return;

    setIsCreating(true);

    try {
      const response = await fetch('/api/markets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          outcomeOptions: outcomes.filter(o => o.trim()),
          duration: parseInt(duration),
          creatorId: 'creator1', // In production, get from user session
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Market created successfully!');
        onClose();
        // Refresh the page to show the new market
        window.location.reload();
      } else {
        alert(data.error || 'Failed to create market. Please try again.');
      }
    } catch (error) {
      console.error('Error creating market:', error);
      alert('Failed to create market. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface border border-gray-600 rounded-lg w-full max-w-md animate-slide-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-600">
          <h3 className="text-lg font-semibold text-text-primary">Create Market</h3>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Market Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Will stream hit 1000 viewers?"
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Outcome Options
            </label>
            <div className="space-y-2">
              {outcomes.map((outcome, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={outcome}
                    onChange={(e) => updateOutcome(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
                  />
                  {outcomes.length > 2 && (
                    <button
                      onClick={() => removeOutcome(index)}
                      className="text-red-400 hover:text-red-300 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              
              {outcomes.length < 5 && (
                <button
                  onClick={addOutcome}
                  className="w-full border-2 border-dashed border-gray-600 rounded-md p-2 text-text-muted hover:text-text-primary hover:border-gray-500 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Option
                </button>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Duration (minutes)
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-text-primary focus:outline-none focus:border-accent"
            >
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
              <option value="240">4 hours</option>
              <option value="480">8 hours</option>
            </select>
          </div>
          
          <div className="bg-gray-700/50 rounded-md p-3">
            <div className="text-sm text-text-primary mb-1">Market Preview</div>
            <div className="text-xs text-text-muted">
              {title || 'Market title will appear here'}
            </div>
            <div className="flex gap-1 mt-2">
              {outcomes.filter(o => o.trim()).map((outcome, index) => (
                <div
                  key={index}
                  className="bg-gray-600 text-xs px-2 py-1 rounded text-text-primary"
                >
                  {outcome}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-600">
          <button
            onClick={handleCreate}
            disabled={!title || outcomes.some(o => !o.trim()) || isCreating}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreating ? 'Creating Market...' : 'Create Market'}
          </button>
        </div>
      </div>
    </div>
  );
}
