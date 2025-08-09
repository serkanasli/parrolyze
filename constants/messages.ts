export const messages = {
  success: {
    create: (subject: string) => `${subject} created successfully.`,
    update: (subject: string) => `${subject} updated successfully.`,
    delete: (subject: string) => `${subject} deleted successfully.`,
    generic: "Operation completed successfully.",
  },
  error: {
    create: (subject: string) => `Failed to create ${subject}.`,
    update: (subject: string) => `Failed to update ${subject}.`,
    delete: (subject: string) => `Failed to delete ${subject}.`,
    generic: "An unexpected error occurred. Please try again later.",
  },
};
