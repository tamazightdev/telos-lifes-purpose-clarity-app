import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Filter } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { problemCategories, searchProblems } from '../../data/problems';

interface ProblemSuggestionsProps {
  onSelectProblem: (problem: string) => void;
  selectedProblems: string[];
}

export const ProblemSuggestions: React.FC<ProblemSuggestionsProps> = ({
  onSelectProblem,
  selectedProblems
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAllCategories, setShowAllCategories] = useState(false);

  const filteredProblems = searchQuery
    ? searchProblems(searchQuery)
    : selectedCategory
    ? problemCategories.find(cat => cat.id === selectedCategory)?.problems.map(problem => ({
        category: problemCategories.find(cat => cat.id === selectedCategory)?.name || '',
        problem
      })) || []
    : [];

  const displayedCategories = showAllCategories
    ? problemCategories
    : problemCategories.slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Search className="w-5 h-5 mr-2" />
          Problem Database
        </h3>
        
        <div className="space-y-4">
          <Input
            placeholder="Search problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === '' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSelectedCategory('')}
            >
              All Categories
            </Button>
            {displayedCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
            {!showAllCategories && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllCategories(true)}
              >
                <Plus className="w-4 h-4 mr-1" />
                More
              </Button>
            )}
          </div>
        </div>
      </GlassCard>

      {!searchQuery && !selectedCategory && (
        <div className="grid md:grid-cols-2 gap-4">
          {displayedCategories.map((category) => (
            <GlassCard
              key={category.id}
              className="p-4 hover:bg-white/10 cursor-pointer"
              onClick={() => setSelectedCategory(category.id)}
            >
              <h4 className="font-medium text-white mb-2">{category.name}</h4>
              <p className="text-sm text-white/70 mb-3">{category.description}</p>
              <div className="text-xs text-white/60">
                {category.problems.length} problems
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {filteredProblems.length > 0 && (
        <GlassCard className="p-6">
          <h4 className="font-medium text-white mb-4">
            Suggested Problems ({filteredProblems.length})
          </h4>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredProblems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GlassCard
                  variant="suggestion"
                  className="p-3 cursor-pointer"
                  onClick={() => onSelectProblem(item.problem)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-white/90 text-sm mb-1">{item.problem}</p>
                      <p className="text-xs text-white/60">{item.category}</p>
                    </div>
                    <Plus className="w-4 h-4 text-white/60 ml-2 flex-shrink-0" />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      )}
    </motion.div>
  );
};