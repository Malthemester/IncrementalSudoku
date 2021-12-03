
export default function DesplaySolved(props) {
    return (
        <div className="topBar">
            <span className="topText">
                Idel Sudoku
            </span>
            <span className="help">?
            </span>
            <div className="hide">
                This is an Idel Sudoku game. <br/>
                To get started solve the sudoku or click the process bar next to the pointer  <br/><br/> 
                
                More items in the shop vill become purchasable has you buy more <br/><br/>
                
                How to play Sukodu <br/>
                - Every square has to contain a single number <br/>
                - Only the numbers from 1 through to size can be used<br/>
                - Each size x size box can only contain each number from 1 to size once<br/>
                - Each vertical column can only contain each number from 1 to size once<br/>
                - Each horizontal row can only contain each number from 1 to size once
            </div>
        </div>
    )
}