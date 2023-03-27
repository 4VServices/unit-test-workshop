"use strict";

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
function runAsUpdate(func) {
  return xdmp.invokeFunction(func, { "update": "true" });
}

/**
 * Runs the provided function in a separate query request.
 * @param func a zero-arity function
 * @return the response from the function in a Sequence
 */
function runAsQuery(func) {
  return xdmp.invokeFunction(func, { "update": "false" });
}

module.exports = { createTestCredential, removeTestCredential, runAsUpdate, runAsQuery };
