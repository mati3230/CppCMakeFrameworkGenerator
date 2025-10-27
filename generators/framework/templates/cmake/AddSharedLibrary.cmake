# Define a helper function to add a shared library
function(add_shared_library lib_name src_files header_files additional_include_dirs additional_link_libs)
    add_library(${lib_name} SHARED ${src_files} ${header_files})
    set(ALL_HEADERS ${ALL_HEADERS} ${header_files} PARENT_SCOPE)
    set(ALL_TARGETS ${ALL_TARGETS} ${lib_name} PARENT_SCOPE)

    target_include_directories(${lib_name} PRIVATE ${additional_include_dirs})
    target_link_libraries(${lib_name} PRIVATE ${additional_link_libs})

    if(MSVC)
        set(LIB_OUTPUT_NAME "lib${lib_name}")
    else()
        set(LIB_OUTPUT_NAME "${lib_name}")
    endif()
    set_target_properties(${lib_name}
        PROPERTIES
            RUNTIME_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR}
            OUTPUT_NAME ${LIB_OUTPUT_NAME}
    )
    
    message(STATUS "Shared library '${lib_name}' added.")
endfunction()