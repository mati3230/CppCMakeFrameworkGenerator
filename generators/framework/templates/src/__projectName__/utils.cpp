#include <<%= projectName %>/utils.h>
#include <iostream>

void <%= projectName %>::MyUtilityOperation() { Print("exec my utility op!"); }

void <%= projectName %>::Print(const std::string& message) { std::cout << "<%= projectName %>: " << message << std::endl; }

int <%= projectName %>::Add(int a, int b) { return a + b; }