import '@testing-library/jest-dom'

// @ts-expect-error - HTMLCanvasElement.prototype.getContext mock for testing
HTMLCanvasElement.prototype.getContext = () => {}

beforeAll(() => {})
