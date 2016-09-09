      status: 'modified',
exports.testNewPatch = function(test) {
  var str = `diff --git file.txt file.txt
new file mode 100644
index 0000000..dab621c
--- /dev/null
+++ file.txt
@@ -0,0 +1 @@
+foo`

  const output = diff.parse(str)
  assert.deepEqual(output, [
    {
      oldPath: null,
      newPath: 'file.txt',
      oldMode: null,
      newMode: '100644',
      status: 'added',
      hunks: [
        {
          oldStartLine: 0,
          oldLineCount: 0,
          newStartLine: 1,
          newLineCount: 1,
          lines: ['+foo']
        }
      ]
    }
  ])
  test.done()
}

exports.testRemovedPatch = function(test) {
  var str = `diff --git file.txt file.txt
deleted file mode 100644
index dab621c..0000000
--- file.txt
+++ /dev/null
@@ -1 +0,0 @@
-foo`

  const output = diff.parse(str)
  assert.deepEqual(output, [
    {
      oldPath: 'file.txt',
      newPath: null,
      oldMode: '100644',
      newMode: null,
      status: 'deleted',
      hunks: [
        {
          oldStartLine: 1,
          oldLineCount: 1,
          newStartLine: 0,
          newLineCount: 0,
          lines: ['-foo']
        }
      ]
    }
  ])
  test.done()
}

      status: 'modified',
      hunks: [],
      status: 'added'
      status: 'modified',
      status: 'modified',
      status: 'modified',
      status: 'modified',
      status: 'modified',

exports.testMergeConflicts = function(test) {
  var str = `diff --cc modified-on-both.txt
index 5b7855c,1353022..0000000
--- modified-on-both.txt
+++ modified-on-both.txt
@@@ -1,1 -1,1 +1,7 @@@
++<<<<<<< HEAD
 +master modification
++||||||| merged common ancestors
++text
++=======
+ branch modification
++>>>>>>> branch
* Unmerged path removed-on-branch.txt
* Unmerged path removed-on-master.txt`

  const output = diff.parse(str)
  assert.deepEqual(output, [
    {
      filePath: 'modified-on-both.txt',
      status: 'unmerged',
      hunks: [
        {
          ourStartLine: 1,
          ourLineCount: 1,
          baseStartLine: 1,
          baseLineCount: 1,
          theirStartLine: 1,
          theirLineCount: 7,
          lines: [
            '++<<<<<<< HEAD',
            ' +master modification',
            '++||||||| merged common ancestors',
            '++text',
            '++=======',
            '+ branch modification',
            '++>>>>>>> branch'
          ]
        }
      ]
    },
    {
      filePath: 'removed-on-branch.txt',
      status: 'unmerged'
    },
    {
      filePath: 'removed-on-master.txt',
      status: 'unmerged'
    }
  ])
  test.done()
}