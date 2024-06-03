import os
from setuptools import find_packages, setup
from glob import glob
from os.path import basename, splitext

def read_requirements(filename):
    with open(filename, "r") as req:
        requirements = req.readlines()
    install_requires = [r.strip() for r in requirements if r.find("git+") != 0]
    return install_requires

def read(filepath):
    with open(filepath, "r") as file_handle:
        content = file_handle.read()
    return content

REQUIREMENTS = read_requirements("requirements.txt")

setup(
    name="formsflow_api",
    packages=find_packages("src"),
    package_dir={"": "src"},
    py_modules=[splitext(basename(path))[0] for path in glob("src/*.py")],
    include_package_data=True,
    package_data={
        'formsflow_api_utils': ['utils/permissions.json'],
    },
    long_description=read("README.md"),
    zip_safe=False,
    install_requires=REQUIREMENTS,
    setup_requires=[
        "pytest-runner",
    ],
    tests_require=[
        "pytest",
    ],
)

# Debugging prints
print("Files in the package directory:")
for root, dirs, files in os.walk("src/formsflow_api_utils"):
    for file in files:
        print(os.path.join(root, file))
