const hasErrors = (obj: any): obj is { errors: { full_messages: string[] } } => {
      return obj && obj.errors && Array.isArray(obj.errors.full_messages);
};

export default hasErrors;
