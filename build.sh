#!/bin/bash

# DrawPen Build & Deployment Script
# This script automates the packaging and distribution process for macOS.
# brew install node

# Colors for output
BLUE='\033[0;34m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

function show_help() {
    echo "Usage: ./build.sh [option]"
    echo ""
    echo "Options:"
    echo "  --local     Build a local, unsigned .app bundle (fastest for testing)"
    echo "  --prod      Build a signed and notarized .app bundle (requires .env credentials)"
    echo "  --dmg       Build a signed DMG installer for distribution"
    echo "  --clean     Remove the 'out/' and '.webpack/' directories"
    echo "  --help      Show this help message"
}

function check_deps() {
    if [ ! -d "node_modules" ]; then
        echo -e "${BLUE}Installing dependencies...${NC}"
        npm install
    fi
}

function clean() {
    echo -e "${BLUE}Cleaning build directories...${NC}"
    rm -rf out .webpack
}

# Ensure we are in the project root
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found. Please run this script from the project root.${NC}"
    exit 1
fi

if [ $# -eq 0 ]; then
    show_help
    exit 1
fi

case "$1" in
    --local)
        check_deps
        echo -e "${GREEN}Building local unsigned bundle...${NC}"
        npm run package_no_sign
        echo -e "${GREEN}Build complete! Check the 'out/' directory.${NC}"
        ;;
    --prod)
        check_deps
        if [ ! -f ".env" ]; then
            echo -e "${RED}Error: .env file not found. Ensure APPLE_ID, APPLE_PASSWORD, and APPLE_TEAM_ID are set.${NC}"
            exit 1
        fi
        echo -e "${GREEN}Building signed and notarized bundle...${NC}"
        npm run package
        echo -e "${GREEN}Production build complete! Check the 'out/' directory.${NC}"
        ;;
    --dmg)
        check_deps
        if [ ! -f ".env" ]; then
            echo -e "${RED}Error: .env file not found. DMG builds require signing credentials.${NC}"
            exit 1
        fi
        echo -e "${GREEN}Building signed DMG installer...${NC}"
        npm run make
        echo -e "${GREEN}DMG creation complete! Check 'out/make/'.${NC}"
        ;;
    --clean)
        clean
        echo -e "${GREEN}Cleanup complete.${NC}"
        ;;
    --help)
        show_help
        ;;
    *)
        echo -e "${RED}Invalid option: $1${NC}"
        show_help
        exit 1
        ;;
esac
