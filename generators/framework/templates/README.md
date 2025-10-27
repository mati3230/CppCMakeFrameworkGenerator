# CMake Generate, Build and Install

1. Press **Ctrl + Shift + p** and run **CMake: Configure**.
2. Press **Ctrl + Shift + p** and run **CMake: Build**.
3. After configured an appropriate launch configuration, Press **F5** to start debugging or press **Ctrl + Shift + p** and run **CMake: Run Without Debugging** to run without debugging.
4. Press **Ctrl + Shift + p** and run **CMake: Install** to install the project. Note that you eventually need to configure and install twice on windows as it is first tries to install in the program files directory which needs admin rights.

# Unit Tests

1. Configure this project with the option **BUILD_WITH_TESTS**.
2. Build the project.
3. To run the unit tests, press **Ctrl + Shift + p** and run **CMake: Run Tests**.

# Include in another Project

A sample project can be created by the generator: **yo cpp-cmake-framework:consumer**.

Your framework can be used in another project by using the following CMakeLists.txt and replacing myframework with your framework name. Note that an environment variable **MYFRAMEWORK_ROOT** was created so that the **find_package(myframework REQUIRED)** works. Furthermore, you have to create a main.cpp file and to reference the correct libraries of your framework.

```
cmake_minimum_required(VERSION 3.10 FATAL_ERROR)

if(POLICY CMP0074)
  cmake_policy(SET CMP0074 NEW)
endif()

set(PROJECT_NAME "myframeworktest")
set(PROJECT_VERSION "0.0.1")

message(STATUS "ENV{MYFRAMEWORK_ROOT}: '$ENV{MYFRAMEWORK_ROOT}'")

project(${PROJECT_NAME} LANGUAGES CXX VERSION ${PROJECT_VERSION})

find_package(myframework REQUIRED)

add_executable(${PROJECT_NAME} "main.cpp")

target_include_directories(${PROJECT_NAME} PRIVATE
    "$ENV{MYFRAMEWORK_ROOT}/include"
)

target_link_libraries(${PROJECT_NAME} PRIVATE
    myframework::mfutils
)

if(WIN32)
get_target_property(libmyframework_sharedlib myframework::mfutils IMPORTED_LOCATION_DEBUG)
add_custom_command(TARGET ${PROJECT_NAME} POST_BUILD
    COMMAND "${CMAKE_COMMAND}" -E copy
    ${libmyframework_sharedlib}
    ${CMAKE_CURRENT_BINARY_DIR} )
endif()
```
