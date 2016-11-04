var dedent = require('dedent-js')
  var str = dedent`
    diff --git file.txt file.txt
    index 83db48f..bf269f4 100644
    --- file.txt
    +++ file.txt
    @@ -1,3 +1,3 @@
     line1
    -line2
    +new line
     line3
  `
      ],
      binary: false
  var str = dedent`
    diff --git file.txt file.txt
    new file mode 100644
    index 0000000..dab621c
    --- /dev/null
    +++ file.txt
    @@ -0,0 +1 @@
    +foo
  `
      ],
      binary: false
  var str = dedent`
    diff --git file.txt file.txt
    deleted file mode 100644
    index dab621c..0000000
    --- file.txt
    +++ /dev/null
    @@ -1 +0,0 @@
    -foo
  `
      ],
      binary: false
  var str = dedent`
    diff --git file.txt file.txt
    old mode 100644
    new mode 100755
    index 83db48f..bf269f4
    --- file.txt
    +++ file.txt
    @@ -1,3 +1,3 @@
     line1
    -line2
    +new line
     line3
  `
      ],
      binary: false
  var str = dedent`
    diff --git newfile.txt newfile.txt
    new file mode 100644
    index 0000000..e69de29
  `
      status: 'added',
      binary: false
  var str = dedent`
    diff --git file.txt file.txt
    index 83db48f..bf269f4 100644
    --- file.txt
    +++ file.txt
    @@ -1 +1 @@
    -line1
    +line2
  `
      ],
      binary: false
  var str = dedent`
    diff --git file.txt file.txt
    index 83db48f..bf269f4 100644
    --- file.txt
    +++ file.txt
    @@ -1,5 +1,4 @@
     line1
    -line2
     line3
     line4
     line5
    @@ -15,4 +14,5 @@
     line6
     line7
     line8
    +line2
     line9
  `
      ],
      binary: false
  var str = dedent`
    diff --git file.txt file.txt
    index a999a0c..266014b 100644
    --- file.txt
    +++ file.txt
    @@ -1 +1 @@
    -line
    +line
    \ No newline at end of file
  `
      ],
      binary: false
  var str = dedent`
    diff --git file.txt file.txt
    index 266014b..a999a0c 100644
    --- file.txt
    +++ file.txt
    @@ -1 +1 @@
    -line
    \ No newline at end of file
    +line
  `
      ],
      binary: false
  var str = dedent`
    diff --git file.txt file.txt
    index 83db48f..bf269f4 100644
    --- file.txt
    +++ file.txt
    @@ -1,3 +1,3 @@
     line1
    -line2
    +
     line3
  `
      ],
      binary: false
  var str = dedent`
    diff --cc modified-on-both.txt
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
    * Unmerged path removed-on-master.txt
    diff --cc image.gif
    index e6551c7,5f88da9..0000000
    Binary files differ
  `
      ],
      binary: false
      status: 'unmerged',
      binary: false
      status: 'unmerged',
      binary: false
    },
    {
      filePath: 'image.gif',
      status: 'unmerged',
      binary: true

exports.testBinaryFiles = function(test) {
  var str = dedent`
    diff --git one.gif one.gif
    new file mode 100644
    index 0000000..9243b23
    Binary files /dev/null and one.gif differ
    diff --git two.gif two.gif
    index 9243b23..e26b70a 100644
    Binary files two.gif and two.gif differ
    diff --git three.gif three.gif
    deleted file mode 100644
    index e26b70a..0000000
    Binary files three.gif and /dev/null differ
  `

  const output = diff.parse(str)
  assert.deepEqual(output, [
    {
      oldPath: null,
      newPath: 'one.gif',
      oldMode: null,
      newMode: '100644',
      status: 'added',
      hunks: [],
      binary: true
    },
    {
      oldPath: 'two.gif',
      newPath: 'two.gif',
      oldMode: '100644',
      newMode: '100644',
      status: 'modified',
      hunks: [],
      binary: true
    },
    {
      oldPath: 'three.gif',
      newPath: null,
      oldMode: '100644',
      newMode: null,
      status: 'deleted',
      hunks: [],
      binary: true
    },
  ])
  test.done()
}