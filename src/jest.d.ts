declare global {
  namespace jest {
    interface Matchers<R> {
      constainsMessagesError: (expected: FieldsErrors) => R;
    }
  }
}

export { constainsMessagesError };
