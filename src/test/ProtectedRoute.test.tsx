// test cases:
// - Redirects unauthenticated users
// - Allows authenticated users
// - Handles loading states
// - Manages route protection logic
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { useAuth } from '../hooks/useAuth';
import { useLocation } from 'wouter';

// Mock dependencies
vi.mock('../hooks/useAuth');
vi.mock('wouter', () => ({
  useLocation: vi.fn(),
}));

describe('ProtectedRoute', () => {
  const mockSetLocation = vi.fn();
  const MockChild = () => <div data-testid='protected-content'>Protected Content</div>;

  beforeEach(() => {
    vi.clearAllMocks();
    (useLocation as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => [
      '/current-path',
      mockSetLocation,
    ]);
  });

  it('redirects unauthenticated users to login', () => {
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });

    render(
      <ProtectedRoute>
        <MockChild />
      </ProtectedRoute>
    );

    expect(mockSetLocation).toHaveBeenCalledWith('/login');
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('allows authenticated users to view content', () => {
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
    });

    render(
      <ProtectedRoute>
        <MockChild />
      </ProtectedRoute>
    );

    expect(mockSetLocation).not.toHaveBeenCalled();
    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
    });

    render(
      <ProtectedRoute>
        <MockChild />
      </ProtectedRoute>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(mockSetLocation).not.toHaveBeenCalled();
  });

  it('redirects authenticated users away from auth-only routes', () => {
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
    });

    render(
      <ProtectedRoute requireAuth={false}>
        <MockChild />
      </ProtectedRoute>
    );

    expect(mockSetLocation).toHaveBeenCalledWith('/home');
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });
});
