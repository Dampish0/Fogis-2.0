

export const createUserAuthorityLevel = (role) => {
    switch(role){
        case 'dev':
            return true;
        case 'superadmin':
            return true;
        case 'admin':
            return true;
        default:
            return false;
    }
}

export const createClubAuthorityLevel = (role) => {
    switch(role){
        case 'dev':
            return true;
        case 'superadmin':
            return true;
        case 'admin':
            return true;
        default:
            return false;
    }
}

export const createMatchAuthorityLevel = (role) => {
    switch(role){
        case 'dev':
            return true;
        case 'superadmin':
            return true;
        case 'admin':
            return true;
        default:
            return false;
    }
}

export const createTeamAuthorityLevel = (role) => {
    switch(role){
        case 'dev':
            return true;
        case 'superadmin':
            return true;
        case 'admin':
            return true;
        default:
            return false;
    }
}

//a function to check if a user can update the state of a match such as red card or goal or match ended etc
export const updateMatchAuthorityLevel = (role) => {
    switch(role){
        case 'dev':
            return true;
        case 'superadmin':
            return true;
        case 'admin':
            return true;
        case 'referee':
            return true;
        default:
            return false;
    }
}

export const viewMatchAuthorityLevel = (role) => {
    switch(role){
        case 'dev':
            return true;
        case 'superadmin':
            return true;
        case 'admin':
            return true;
        case 'referee':
            return true;
        case 'trainer':
            return true;
        default:
            return false;
    }
}

export const editTeamAuthorityLevel = (role) => {
    switch(role){
        case 'dev':
            return true;
        case 'superadmin':
            return true;
        case 'admin':
            return true;
        case 'trainer':
            return true;
        default:
            return false;
    }
}

export const editClubAuthorityLevel = (role) => {
    switch(role){
        case 'dev':
            return true;
        case 'superadmin':
            return true;
        case 'admin':
            return true;
        case 'trainer':
            return true;
        default:
            return false;
    }
}

export const editUserAuthorityLevel = (role) => {
    switch(role){
        case 'dev':
            return true;
        case 'superadmin':
            return true;
        case 'admin':
            return true;
        default:
            return false;
    }
}

export const createAdminAuthorityLevel = (role) => {
    switch(role){
        case 'dev':
            return true;
        case 'superadmin':
            return true;
        default:
            return false;
    }
}

