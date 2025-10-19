import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create environments
  const devEnv = await prisma.environment.create({
    data: {
      name: 'Development',
      baseUrl: 'https://jsonplaceholder.typicode.com',
      headers: JSON.stringify({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      variables: JSON.stringify({
        apiKey: 'dev-key-123',
        version: 'v1'
      }),
      active: true
    }
  })

  const stagingEnv = await prisma.environment.create({
    data: {
      name: 'Staging',
      baseUrl: 'https://httpbin.org',
      headers: JSON.stringify({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      variables: JSON.stringify({
        apiKey: 'staging-key-456',
        version: 'v1'
      }),
      active: false
    }
  })

  // Create test suite
  const testSuite = await prisma.testSuite.create({
    data: {
      name: 'JSONPlaceholder API Tests',
      description: 'Test suite for JSONPlaceholder API endpoints',
      status: 'active'
    }
  })

  // Create tests
  const getUsersTest = await prisma.test.create({
    data: {
      name: 'Get Users',
      method: 'GET',
      url: '/users',
      expectedStatus: 200,
      timeout: 30000,
      testSuiteId: testSuite.id
    }
  })

  const getUserByIdTest = await prisma.test.create({
    data: {
      name: 'Get User by ID',
      method: 'GET',
      url: '/users/1',
      expectedStatus: 200,
      timeout: 30000,
      testSuiteId: testSuite.id
    }
  })

  const createPostTest = await prisma.test.create({
    data: {
      name: 'Create Post',
      method: 'POST',
      url: '/posts',
      headers: JSON.stringify({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        title: 'Test Post',
        body: 'This is a test post',
        userId: 1
      }),
      expectedStatus: 201,
      timeout: 30000,
      testSuiteId: testSuite.id
    }
  })

  const updatePostTest = await prisma.test.create({
    data: {
      name: 'Update Post',
      method: 'PUT',
      url: '/posts/1',
      headers: JSON.stringify({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        id: 1,
        title: 'Updated Post',
        body: 'This post has been updated',
        userId: 1
      }),
      expectedStatus: 200,
      timeout: 30000,
      testSuiteId: testSuite.id
    }
  })

  const deletePostTest = await prisma.test.create({
    data: {
      name: 'Delete Post',
      method: 'DELETE',
      url: '/posts/1',
      expectedStatus: 200,
      timeout: 30000,
      testSuiteId: testSuite.id
    }
  })

  // Create assertions for Get Users test
  await prisma.assertion.createMany({
    data: [
      {
        type: 'status',
        expected: JSON.stringify(200),
        testId: getUsersTest.id
      },
      {
        type: 'response_time',
        expected: JSON.stringify(5000),
        testId: getUsersTest.id
      },
      {
        type: 'json_path',
        expected: JSON.stringify('array'),
        jsonPath: 'type',
        testId: getUsersTest.id
      }
    ]
  })

  // Create assertions for Get User by ID test
  await prisma.assertion.createMany({
    data: [
      {
        type: 'status',
        expected: JSON.stringify(200),
        testId: getUserByIdTest.id
      },
      {
        type: 'json_path',
        expected: JSON.stringify(1),
        jsonPath: 'id',
        testId: getUserByIdTest.id
      },
      {
        type: 'json_path',
        expected: JSON.stringify('string'),
        jsonPath: 'name',
        testId: getUserByIdTest.id
      }
    ]
  })

  // Create assertions for Create Post test
  await prisma.assertion.createMany({
    data: [
      {
        type: 'status',
        expected: JSON.stringify(201),
        testId: createPostTest.id
      },
      {
        type: 'json_path',
        expected: JSON.stringify('number'),
        jsonPath: 'id',
        testId: createPostTest.id
      },
      {
        type: 'json_path',
        expected: JSON.stringify('Test Post'),
        jsonPath: 'title',
        testId: createPostTest.id
      }
    ]
  })

  // Create assertions for Update Post test
  await prisma.assertion.createMany({
    data: [
      {
        type: 'status',
        expected: JSON.stringify(200),
        testId: updatePostTest.id
      },
      {
        type: 'json_path',
        expected: JSON.stringify('Updated Post'),
        jsonPath: 'title',
        testId: updatePostTest.id
      }
    ]
  })

  // Create assertions for Delete Post test
  await prisma.assertion.createMany({
    data: [
      {
        type: 'status',
        expected: JSON.stringify(200),
        testId: deletePostTest.id
      }
    ]
  })

  // Create another test suite
  const httpBinSuite = await prisma.testSuite.create({
    data: {
      name: 'HTTPBin API Tests',
      description: 'Test suite for HTTPBin API endpoints',
      status: 'active'
    }
  })

  const getTest = await prisma.test.create({
    data: {
      name: 'HTTP GET Test',
      method: 'GET',
      url: 'https://httpbin.org/get',
      expectedStatus: 200,
      timeout: 30000,
      testSuiteId: httpBinSuite.id
    }
  })

  const postTest = await prisma.test.create({
    data: {
      name: 'HTTP POST Test',
      method: 'POST',
      url: 'https://httpbin.org/post',
      headers: JSON.stringify({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        message: 'Hello World',
        timestamp: new Date().toISOString()
      }),
      expectedStatus: 200,
      timeout: 30000,
      testSuiteId: httpBinSuite.id
    }
  })

  // Create assertions for HTTPBin tests
  await prisma.assertion.createMany({
    data: [
      {
        type: 'status',
        expected: JSON.stringify(200),
        testId: getTest.id
      },
      {
        type: 'json_path',
        expected: JSON.stringify('https://httpbin.org/get'),
        jsonPath: 'url',
        testId: getTest.id
      },
      {
        type: 'status',
        expected: JSON.stringify(200),
        testId: postTest.id
      },
      {
        type: 'json_path',
        expected: JSON.stringify('Hello World'),
        jsonPath: 'json.message',
        testId: postTest.id
      }
    ]
  })

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
