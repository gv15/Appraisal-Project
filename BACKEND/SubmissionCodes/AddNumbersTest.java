import org.junit.Test;
import org.junit.Assert;

public class AddNumbersTest{
    @Test
    public void testCaseOne(){
        Assert.assertEquals(6, Solution.addNumbers(2, 4));
    }

    @Test
    public void testCaseTwo(){
        Assert.assertEquals(2, Solution.addNumbers(-2, 4));
    }

    @Test
    public void testCaseThree(){
        Assert.assertEquals(-36, Solution.addNumbers(-2, -34));
    }

    @Test
    public void testCaseFour(){
        Assert.assertEquals(5, Solution.addNumbers(4, 5));
    }
}