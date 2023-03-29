"use strict";

/**
 * Create a user for testing.
 * @param username A String with the username to create.
 * @param roles An Array of Strings with role names.
 * @return undefined
 */
function createTestUser(username, roles) {
  xdmp.invokeFunction(
    () => {
      const sec = require("/MarkLogic/security.xqy");
      if (!sec.userExists(username)) {
        const password = sem.uuidString();

        sec.createUser(username, "User for unit testing", password, roles, null, null);
      }
    },
    {
      database: xdmp.securityDatabase(),
      update: "true"
    }
  );
}

/**
 * Delete a user by username.
 * @param username A String with the username to delete.
 */
function removeTestUser(username) {
  xdmp.invokeFunction(
    () => {
      const sec = require("/MarkLogic/security.xqy");
      sec.removeUser(username);
    },
    {
      database: xdmp.securityDatabase(),
      update: "true"
    }
  );
}

/**
 * Create a Secure Credential for testing.
 * @param credentialName
 * @param roles
 * @param path
 * @param targetPort
 * @param auth
 */
function createTestCredential(credentialName, roles, path, targetPort, auth = "digest") {
  xdmp.invokeFunction(
    () => {
      const sec = require("/MarkLogic/security.xqy");
      if (
        !sec
          .getCredentialNames()
          .toArray()
          .some((currName) => currName.toString() === credentialName)
      ) {
        const username = `%%mlAppName%%-test-user-${credentialName}-${sem.uuidString()}`;
        const password = sem.uuidString();

        sec.createUser(username, "User for unit testing", password, roles, null, null);

        sec.createCredential(
          credentialName,
          "Credential for unit testing",
          username,
          password,
          null,
          null,
          false,
          sec.uriCredentialTarget(`http://%%mlHost%%:${targetPort}${path}`, auth),
          null
        );
      }
    },
    {
      database: xdmp.securityDatabase(),
      update: "true"
    }
  );
}

/**
 * Remove a Secure Credential
 * @param credentialName
 */
function removeTestCredential(credentialName) {
  xdmp.invokeFunction(
    () => {
      const sec = require("/MarkLogic/security.xqy");
      sec.removeUser(sec.credentialGetUsername(credentialName));
      sec.removeCredential(credentialName);
    },
    {
      database: xdmp.securityDatabase(),
      update: "true"
    }
  );
}

/**
 * Runs the provided function in a separate update transaction.
 * @param func a zero-arity function
 * @return the response from the function in a Sequence
 */
function runAsUpdate(func, options) {
  return xdmp.invokeFunction(func, Object.assign({ "update": "true" }, options));
}

/**
 * Runs the provided function in a separate query request.
 * @param func a zero-arity function
 * @return the response from the function in a Sequence
 */
function runAsQuery(func, options) {
  return xdmp.invokeFunction(func, Object.assign({ "update": "false" }, options));
}

module.exports = {
  createTestUser,
  removeTestUser,
  createTestCredential,
  removeTestCredential,
  runAsUpdate,
  runAsQuery
};
