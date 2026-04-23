import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AiDisclaimer } from './AiDisclaimer';

describe('AiDisclaimer Component', () => {
  it('renders the disclaimer text correctly', () => {
    render(<AiDisclaimer />);
    
    // Check if the bold header is present
    expect(screen.getByText('Lưu ý an toàn:')).toBeInTheDocument();
    
    // Check if part of the text content is present
    expect(
      screen.getByText(/AI Copilot không chẩn đoán y tế và không thay thế quyết định chuyên môn/i)
    ).toBeInTheDocument();
  });

  it('applies custom className if provided', () => {
    const { container } = render(<AiDisclaimer className="custom-test-class" />);
    
    // Check if the custom class is appended
    // The main div is the first child of the container
    expect(container.firstChild).toHaveClass('custom-test-class');
  });
});
