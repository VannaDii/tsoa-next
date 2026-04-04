---
'@tsoa-next/cli': patch
'@tsoa-next/runtime': patch
'tsoa-next': patch
---

Remediate the Sonar cleanup pass across the CLI and runtime without changing the public API surface.

This patch keeps the existing exported contracts intact while reducing internal complexity, preserving legacy compatibility paths, and tightening integration and unit assertions around the affected behavior.
