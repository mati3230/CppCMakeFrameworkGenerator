# About

This project should be a help for setting up a C++ framework with CMake. A scaffold of the CMake project is created with a sample library called mfutils. The scaffold can be used as a starting point which can be changed and extended.

# Requirements

- node
- npm
- cmake
- C/C++ toolchain
- optional: GTest (if **BUILD_WITH_TESTS** is set to **ON** when configuring the generated framework project)

Tested on Windows 11 Home (build 10.0.26200) with:

- node 22.20.0
- npm 11.6.2
- cmake 4.2.0-rc1
- mingw64:
    - gcc (Rev8, Built by MSYS2 project) 15.2.0
    - g++ (Rev8, Built by MSYS2 project) 15.2.0
- GTest 1.16.0 (Toolchain that supports C++17 is required)

# Install Code Generator

1. Make yo globally available with **npm install -g yo**. This tool is used to generate scaffolds.
2. Call **npm install** to install the dependencies of this project.
3. Call **npm link** to make the generator available to yo.

# Generate Project

- In the directory of your choice, call **yo cpp-cmake-framework:framework** from the CLI for generating the framework project.
- In the directory of your choice, call **yo cpp-cmake-framework:consumer** from the CLI for generating a sample consumer project of the framework. Note that an environment valiable named YOURFRAMEWORK_ROOT can be created so that the find_package command in the consumer project will find your framework. You can use capital letters for the environment variable. Change **YOURFRAMEWORK** to the name of your framework.

# Edit Project

## Framework

Add libraries with the corresponding sources with the add_library function:

```
# have a look at 'cmake/AddSharedLibrary.cmake' to extend/change this method
add_shared_library(
    mfutils # the identifier of the library
    "${PROJECT_SRC_DIR}/utils.cpp" # sources; multiple files should be seperated by a semicolon
    "${PROJECT_INCLUDE_DIR}/utils.h" # headers; multiple files should be seperated by a semicolon
    "${PROJECT_TARGET_INCLUDE_DIR}" # target include directories
    "" # target link libraries
)
```

The headers and the libraries will be automatically installed.

To execute unit tests with GTest (optional), a sample file [test_utils.cpp](./generators/framework/templates/tests/test_utils.cpp) will be generated.
