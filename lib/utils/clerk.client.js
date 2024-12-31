"use client";

/**
 * Updates the user's username
 * @param {Object} user - Current user from useUser hook
 * @param {string} username - New username
 */
export const updateUsernameClient = async (user, username) => {
  if (!user) throw new Error("No user found");

  try {
    await user.update({
      username
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating username:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Updates user's email address
 * @param {Object} user - Current user from useUser hook
 * @param {string} email - New email address
 */
export const updateEmailClient = async (user, email) => {
  if (!user) throw new Error("No user found");

  try {
    const emailAddress = await user.createEmailAddress({ email });
    await emailAddress.prepareVerification();
    
    return { success: true, message: "Verification email sent" };
  } catch (error) {
    console.error("Error updating email:", error);
    return { success: false, error: error.message };
  }
};