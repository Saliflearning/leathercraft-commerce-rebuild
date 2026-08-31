import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { evidenceNotes, historicalPhases } from '../data/history';
import { LearningJourney } from './LearningJourney';

describe('LearningJourney', () => {
  it('renders phase evidence status and explicit limitations as text', () => {
    render(<LearningJourney phases={historicalPhases} notes={evidenceNotes} />);

    expect(screen.getAllByText('Verified').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('Qualified').length).toBeGreaterThanOrEqual(2);
    expect(
      screen.getByText(/raw database queries and legacy password hashing/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/first and second database prototypes are credited to teammates/i),
    ).toBeInTheDocument();
  });

  it('keeps score surfaces separate and labels new work and non-claims', () => {
    render(<LearningJourney phases={historicalPhases} notes={evidenceNotes} />);

    expect(
      screen.getByText(/final 53\/60, staged rubric 83\/100, and final-project group 108\/125/i),
    ).toBeInTheDocument();
    expect(screen.getByText('New work')).toBeInTheDocument();
    expect(screen.getByText('Non-claim')).toBeInTheDocument();
  });
});
